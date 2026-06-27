const LedgerEntry = require("../model/ledger.model")

class LedgerRepository {
   async create(entry, session = null) {
      const ledgerEntry = new LedgerEntry(entry)

      return ledgerEntry.save({
         session,
      })
   }

   async createMany(entries, session = null) {
      return LedgerEntry.insertMany(entries, {
         session,
      })
   }

   async findById(id) {
      return LedgerEntry.findById(id)
   }

   async findByTransaction(transactionId, session = null) {
      return LedgerEntry.find({
         transactionId,
      })
         .sort({
            createdAt: 1,
         })
         .session(session)
   }

   async findOwnerLedger(
      ownerType,

      ownerId,

      assetId,

      session = null,
   ) {
      return LedgerEntry.find({
         ownerType,

         ownerId,

         assetId,
      })
         .sort({
            createdAt: -1,
         })
         .session(session)
   }

   async findOwnerHistory(
      ownerType,

      ownerId,

      page = 1,

      limit = 20,
   ) {
      const skip = (page - 1) * limit

      return LedgerEntry.find({
         ownerType,

         ownerId,
      })
         .sort({
            createdAt: -1,
         })
         .skip(skip)
         .limit(limit)
   }

   // Aggregates users balance for a particular asset then
   // we can compare it with balances for reconciliation
   async aggregateBalance(
      ownerType,

      ownerId,

      assetId,
   ) {
      return LedgerEntry.aggregate([
         {
            $match: {
               ownerType,

               ownerId,

               assetId,
            },
         },

         {
            $group: {
               _id: "$entryType",

               total: {
                  $sum: {
                     $toDecimal: "$amount",
                  },
               },
            },
         },
      ])
   }
}

module.exports = new LedgerRepository()
