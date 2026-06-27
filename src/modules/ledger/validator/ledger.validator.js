const Money = require("../../../shared/utils/money")

class LedgerValidator {
   static validateEntries(entries) {
      if (!Array.isArray(entries)) {
         throw new Error("Ledger entries must be an array.")
      }

      if (entries.length === 0) {
         throw new Error("Ledger entries are required.")
      }

      for (const entry of entries) {
         if (!entry.ownerType) throw new Error("Owner type is required.")

         if (!entry.ownerId) throw new Error("Owner ID is required.")

         if (!entry.assetId) throw new Error("Asset ID is required.")

         if (!entry.operation) throw new Error("Operation is required.")

         if (!entry.entryType) throw new Error("Entry type is required.")

         if (!entry.balanceType) throw new Error("Balance type is required.")

         if (!entry.amount) throw new Error("Amount is required.")

         if (!Money.isPositive(entry.amount)) {
            throw new Error("Amount must be greater than zero.")
         }
      }

      return true
   }
}

module.exports = LedgerValidator
