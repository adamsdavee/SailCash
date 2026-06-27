const balanceRepository = require("../repository/balance.repository")

class BalanceService {
   /**
    * Get a user's balance for a specific asset.
    *
    * Used by:
    * - Transfer Service
    * - Buy/Sell Service
    * - Withdrawal Service
    */
   async getBalance(userId, assetId) {
      return balanceRepository.getOrCreateBalance(userId, assetId)
   }

   /**
    * Get all balances for a user.
    *
    * Used by:
    * - "Show my balances"
    * - Wallet dashboard
    */
   async getBalances(userId) {
      return balanceRepository.getBalances(userId)
   }

   /**
    * Project a ledger entry into the balance projection.
    *
    * IMPORTANT:
    * Only LedgerService should call this.
    */
   async projectFromLedger(ledgerEntry, session = null) {
      return balanceRepository.applyDelta(ledgerEntry, session)
   }
}

module.exports = new BalanceService()
