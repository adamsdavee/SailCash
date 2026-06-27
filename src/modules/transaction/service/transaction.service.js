const transactionRepository = require("../repository/transaction.repository")

const { TRANSACTION_STATUS } = require("../../../config/constants")

class TransactionService {
   /**
    * Create a new transaction.
    */
   async create(data, session = null) {
      return transactionRepository.create(data, session)
   }

   /**
    * Find transaction by MongoDB ID.
    */
   async findById(transactionId, populate = true) {
      return transactionRepository.findById(transactionId, populate)
   }

   /**
    * Find transaction by internal reference.
    */
   async findByReference(reference, populate = true) {
      return transactionRepository.findByReference(reference, populate)
   }

   /**
    * Find transaction using idempotency key.
    */
   async findByIdempotencyKey(idempotencyKey) {
      return transactionRepository.findByIdempotencyKey(idempotencyKey)
   }

   /**
    * Check whether a reference already exists.
    */
   async existsByReference(reference) {
      return transactionRepository.existsByReference(reference)
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
      return transactionRepository.updateStatus(
         transactionId,
         status,
         failureReason,
         session,
      )
   }

   /**
    * Convenience helpers
    */

   async markProcessing(transactionId, session = null) {
      return this.updateStatus(
         transactionId,
         TRANSACTION_STATUS.PROCESSING,
         null,
         session,
      )
   }

   async markSuccess(transactionId, session = null) {
      return this.updateStatus(
         transactionId,
         TRANSACTION_STATUS.SUCCESS,
         null,
         session,
      )
   }

   async markFailed(transactionId, reason, session = null) {
      return this.updateStatus(
         transactionId,
         TRANSACTION_STATUS.FAILED,
         reason,
         session,
      )
   }

   /**
    * Save external provider reference.
    */
   async updateExternalReference(
      transactionId,
      externalReference,
      session = null,
   ) {
      return transactionRepository.updateExternalReference(
         transactionId,
         externalReference,
         session,
      )
   }

   /**
    * Get a user's transactions.
    */
   async findUserTransactions(userId, options = {}) {
      return transactionRepository.findUserTransactions(userId, options)
   }
}

module.exports = new TransactionService()
