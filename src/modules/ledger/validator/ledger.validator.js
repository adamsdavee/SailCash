const Money = require("../../../shared/utils/money")
const LedgerPostingError = require("../../../shared/errors/ledger-posting.error")

const {
   LEDGER_ENTRY_TYPES,
   LEDGER_BALANCE_TYPES,
   LEDGER_OWNER_TYPES,
   LEDGER_OPERATIONS,
} = require("../../../config/constants")

class LedgerValidator {
   static validate(entries) {
      if (!Array.isArray(entries)) {
         throw new LedgerPostingError(
            "Ledger entries must be an array.",
            "INVALID_ENTRIES",
         )
      }

      if (entries.length === 0) {
         throw new LedgerPostingError(
            "Ledger entries cannot be empty.",
            "EMPTY_ENTRIES",
         )
      }

      for (const entry of entries) {
         if (!Object.values(LEDGER_OWNER_TYPES).includes(entry.ownerType)) {
            throw new LedgerPostingError(
               "Invalid owner type.",
               "INVALID_OWNER_TYPE",
            )
         }

         if (!entry.ownerId) {
            throw new LedgerPostingError(
               "Owner ID is required.",
               "OWNER_REQUIRED",
            )
         }

         if (!entry.assetId) {
            throw new LedgerPostingError(
               "Asset ID is required.",
               "ASSET_REQUIRED",
            )
         }

         if (!Object.values(LEDGER_OPERATIONS).includes(entry.operation)) {
            throw new LedgerPostingError(
               "Invalid ledger operation.",
               "INVALID_OPERATION",
            )
         }

         if (!Object.values(LEDGER_ENTRY_TYPES).includes(entry.entryType)) {
            throw new LedgerPostingError(
               "Invalid entry type.",
               "INVALID_ENTRY_TYPE",
            )
         }

         if (!Object.values(LEDGER_BALANCE_TYPES).includes(entry.balanceType)) {
            throw new LedgerPostingError(
               "Invalid balance type.",
               "INVALID_BALANCE_TYPE",
            )
         }

         if (!entry.amount) {
            throw new LedgerPostingError(
               "Amount is required.",
               "AMOUNT_REQUIRED",
            )
         }

         if (!Money.isPositive(entry.amount)) {
            throw new LedgerPostingError(
               "Amount must be greater than zero.",
               "INVALID_AMOUNT",
            )
         }
      }

      return true
   }
}

module.exports = LedgerValidator
