const transactionManager = require("../../../shared/utils/transactionManager")

const ledgerRepository = require("../repository/ledger.repository")
const balanceService = require("../../balance/service/balance.service")

const LedgerValidator = require("../validator/ledger.validator")
const PostingBatchValidator = require("../validator/posting-batch.validator")

class LedgerService {
   /**
    * Posts a batch of ledger entries.
    *
    * This is the ONLY service allowed
    * to modify balance projections.
    */
   async postEntries(entries) {
      // Validate individual entries
      LedgerValidator.validate(entries)

      // Validate the batch
      PostingBatchValidator.validate(entries)

      return transactionManager(async (session) => {
         // Persist immutable ledger entries
         const savedEntries = await ledgerRepository.createMany(
            entries,
            session,
         )

         // Update balance projections
         for (const ledgerEntry of savedEntries) {
            await balanceService.projectFromLedger(ledgerEntry, session)
         }

         return {
            success: true,
            entries: savedEntries,
            count: savedEntries.length,
            postedAt: new Date(),
            projectionUpdated: true,
         }
      })
   }
}

module.exports = new LedgerService()
