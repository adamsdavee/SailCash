const Transaction = require("../model/transaction.model")

class TransactionRepository {
   /**
    * Create a new transaction.
    */
   async create(data, session = null) {
      const transaction = new Transaction(data)

      await transaction.save({ session })

      return transaction
   }

   /**
    * Find transaction by Mongo ID.
    */
   async findById(id, populate = true) {
      const query = Transaction.findById(id)

      if (populate) {
         return query.populate("userId").populate("assetId")
      }

      return query
   }

   /**
    * Find by internal transaction reference.
    */
   async findByReference(reference) {
      const query = Transaction.findById(id)

      if (populate) {
         return query.populate("userId").populate("assetId")
      }

      return query
   }

   /**
    * Find by idempotency key.
    */
   async findByIdempotencyKey(idempotencyKey) {
      return Transaction.findOne({
         idempotencyKey,
      })
   }

   /**
    * Check if a reference already exists.
    */
   async existsByReference(reference) {
      return Transaction.exists({
         reference,
      })
   }

   /**
    * Update transaction status.
    */
   async updateStatus(
      transactionId,
      status,
      failureReason = null,
      session = null,
   ) {
      return Transaction.findByIdAndUpdate(
         transactionId,

         {
            $set: {
               status,
               failureReason,
            },

            $push: {
               statusHistory: {
                  status,
                  changedAt: new Date(),
                  reason: failureReason,
               },
            },
         },

         {
            new: true,
            session,
         },
      )
   }

   /**
    * Update external reference.
    *
    * Example:
    * Blockchain hash
    * Nomba payment reference
    */
   async updateExternalReference(
      transactionId,
      externalReference,
      session = null,
   ) {
      return Transaction.findByIdAndUpdate(
         transactionId,

         {
            externalReference,
         },

         {
            new: true,
            session,
         },
      )
   }

   /**
    * List a user's transactions.
    */
   async findUserTransactions(userId, options = {}) {
      const { page = 1, limit = 20 } = options

      return Transaction.find({
         userId,
      })

         .sort({
            createdAt: -1,
         })

         .skip((page - 1) * limit)

         .limit(limit)

         .populate("assetId")
   }

   /**
    * Delete transaction.
    *
    * Reserved for development/testing.
    * Should never be used in production.
    */
   async delete(id) {
      return Transaction.findByIdAndDelete(id)
   }
}

module.exports = new TransactionRepository()
