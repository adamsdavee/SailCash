const LedgerEntry = require("../model/ledger.model")

class LedgerRepository {
   async create(entry) {
      return LedgerEntry.create(entry)
   }

   async createMany(entries) {
      return LedgerEntry.insertMany(entries)
   }

   async findByTransaction(transactionId) {
      return LedgerEntry.find({
         transactionId,
      })
   }

   async findOwnerLedger(ownerType, ownerId, assetId) {
      return LedgerEntry.find({
         ownerType,
         ownerId,
         assetId,
      }).sort({
         createdAt: -1,
      })
   }
}

module.exports = new LedgerRepository()
