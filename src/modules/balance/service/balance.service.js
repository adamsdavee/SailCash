const balanceRepository = require("../repository/balance.repository")

class BalanceService {
   async getOrCreateBalance(userId, assetId) {
      let balance = await balanceRepository.findByUserAndAsset(userId, assetId)

      if (!balance) {
         balance = await balanceRepository.createProjection({
            userId,
            assetId,

            availableBalance: 0,

            pendingBalance: 0,

            lockedBalance: 0,

            lastLedgerEntryId: null,

            lastProjectedAt: null,
         })
      }

      return balance
   }

   async getUserBalances(userId) {
      return balanceRepository.findUserBalances(userId)
   }

   // Only ledger service allowed to call this function
   async updateProjection(balanceId, payload) {
      return balanceRepository.update(balanceId, payload)
   }
}

module.exports = new BalanceService()
