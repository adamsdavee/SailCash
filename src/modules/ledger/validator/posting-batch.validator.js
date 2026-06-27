const LedgerPostingError = require("../../../shared/errors/ledger-posting.error")

class PostingBatchValidator {
   static validate(entries) {
      if (!entries || entries.length === 0) {
         throw new LedgerPostingError(
            "Posting batch cannot be empty.",
            "EMPTY_POSTING_BATCH",
         )
      }

      const transactionId = entries[0].transactionId
      const assetId = entries[0].assetId
      const operation = entries[0].operation

      for (const entry of entries) {
         if (entry.transactionId !== transactionId) {
            throw new LedgerPostingError(
               "All ledger entries must belong to the same transaction.",
               "MIXED_TRANSACTION_BATCH",
            )
         }

         if (String(entry.assetId) !== String(assetId)) {
            throw new LedgerPostingError(
               "All ledger entries must use the same asset.",
               "MIXED_ASSET_BATCH",
            )
         }

         if (entry.operation !== operation) {
            throw new LedgerPostingError(
               "All ledger entries must have the same operation.",
               "MIXED_OPERATION_BATCH",
            )
         }
      }

      return true
   }
}

module.exports = PostingBatchValidator
