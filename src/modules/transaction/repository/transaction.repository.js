const Transaction = require("../model/transaction.model")

class TransactionRepository {
   async create(payload) {
      return Transaction.create(payload)
   }

   async findById(id) {
      return Transaction.findById(id)
   }

   async findByReference(reference) {
      return Transaction.findOne({
         reference,
      })
   }

   async update(id, payload) {
      return Transaction.findByIdAndUpdate(id, payload, {
         new: true,
      })
   }

   async findUserTransactions(userId) {
      return Transaction.find({
         userId,
      })
         .sort({
            createdAt: -1,
         })
         .limit(50)
   }

   async findByIdempotencyKey(key) {
      return Transaction.findOne({
         idempotencyKey: key,
      })
   }
}

module.exports = new TransactionRepository()
