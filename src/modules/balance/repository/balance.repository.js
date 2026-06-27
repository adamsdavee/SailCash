const Balance = require("../model/balance.model")
const Money = require("../../../shared/utils/money")
const {
   LEDGER_ENTRY_TYPES,
   LEDGER_BALANCE_TYPES,
} = require("../../../config/constants")

class BalanceRepository {
   async createProjection(payload) {
      return Balance.create(payload)
   }

   async findByUserAndAsset(userId, assetId) {
      return Balance.findOne({
         userId,
         assetId,
      })
   }

   async findUserBalances(userId) {
      return Balance.find({
         userId,
      }).populate("assetId", "assetCode symbol")
   }

   async update(id, payload) {
      return Balance.findByIdAndUpdate(id, payload, {
         new: true,
      })
   }

   // Updating user balance details

   async applyDelta(ledgerEntry, session = null) {
      // MVP: only USER balances are projected
      if (ledgerEntry.ownerType !== LEDGER_OWNER_TYPES.USER) {
         return null
      }

      const balance = await Balance.findOne({
         userId: ledgerEntry.ownerId,

         assetId: ledgerEntry.assetId,
      }).session(session)

      if (!balance) {
         throw new Error("Balance projection not found.")
      }

      let balanceField

      switch (ledgerEntry.balanceType) {
         case LEDGER_BALANCE_TYPES.AVAILABLE:
            balanceField = "availableBalance"
            break

         case LEDGER_BALANCE_TYPES.PENDING:
            balanceField = "pendingBalance"
            break

         case LEDGER_BALANCE_TYPES.LOCKED:
            balanceField = "lockedBalance"
            break

         default:
            throw new Error("Invalid balance type.")
      }

      if (ledgerEntry.entryType === LEDGER_ENTRY_TYPES.DEBIT) {
         balance[balanceField] = Money.subtract(
            balance[balanceField],
            ledgerEntry.amount,
         )
      } else {
         balance[balanceField] = Money.add(
            balance[balanceField],
            ledgerEntry.amount,
         )
      }

      balance.lastLedgerEntryId = ledgerEntry._id

      balance.lastProjectedAt = new Date()

      await balance.save({ session })

      return balance
   }
}

module.exports = new BalanceRepository()
