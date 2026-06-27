const Balance = require("../model/balance.model")
const Money = require("../../../shared/utils/money")

const {
   LEDGER_ENTRY_TYPES,
   LEDGER_BALANCE_TYPES,
   LEDGER_OWNER_TYPES,
} = require("../../../config/constants")

class BalanceRepository {
   /**
    * Get balance projection
    */
   async findByUserAndAsset(userId, assetId) {
      return Balance.findOne({
         userId,
         assetId,
      })
   }

   /**
    * Get or automatically create balance projection
    */
   async getOrCreateBalance(userId, assetId, session = null) {
      let balance = await Balance.findOne({
         userId,
         assetId,
      }).session(session)

      if (!balance) {
         balance = new Balance({
            userId,

            assetId,

            availableBalance: Money.zero(),

            pendingBalance: Money.zero(),

            lockedBalance: Money.zero(),

            lastLedgerEntryId: null,

            lastProjectedAt: null,
         })

         await balance.save({
            session,
         })
      }

      return balance
   }

   /**
    * Apply a Ledger Entry to the projection.
    * This is the ONLY method that changes balances.
    */
   async applyDelta(ledgerEntry, session = null) {
      /**
       * MVP:
       * Only user balances are projected.
       *
       * Treasury balances will get
       * their own projection repository
       * in Phase 8.
       */
      if (ledgerEntry.ownerType !== LEDGER_OWNER_TYPES.USER) {
         return null
      }

      const balance = await this.getOrCreateBalance(
         ledgerEntry.ownerId,

         ledgerEntry.assetId,

         session,
      )

      let field

      switch (ledgerEntry.balanceType) {
         case LEDGER_BALANCE_TYPES.AVAILABLE:
            field = "availableBalance"

            break

         case LEDGER_BALANCE_TYPES.PENDING:
            field = "pendingBalance"

            break

         case LEDGER_BALANCE_TYPES.LOCKED:
            field = "lockedBalance"

            break

         default:
            throw new Error("Unsupported balance type.")
      }

      if (ledgerEntry.entryType === LEDGER_ENTRY_TYPES.DEBIT) {
         balance[field] = Money.subtract(
            balance[field],

            ledgerEntry.amount,
         )
      } else {
         balance[field] = Money.add(
            balance[field],

            ledgerEntry.amount,
         )
      }

      balance.lastLedgerEntryId = ledgerEntry._id

      balance.lastProjectedAt = new Date()

      await balance.save({
         session,
      })

      return balance
   }

   /**
    * Used by APIs
    */
   async getBalances(userId) {
      return Balance.find({
         userId,
      }).populate("assetId")
   }
}

module.exports = new BalanceRepository()
