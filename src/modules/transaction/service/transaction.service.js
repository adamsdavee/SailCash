const transactionRepository = require("../repository/transaction.repository")

const referenceGenerator = require("../../../shared/utils/referenceGenerator")

class TransactionService {
   async createTransaction(payload) {
      const existing = await transactionRepository.findByIdempotencyKey(
         payload.idempotencyKey,
      )

      if (existing) {
         return existing
      }

      return transactionRepository.create({
         ...payload,

         reference: referenceGenerator.generate("TXN"),

         statusHistory: [
            {
               status: "PENDING",
            },
         ],
      })
   }

   async markProcessing(id) {
      return transactionRepository.update(id, {
         status: "PROCESSING",
      })
   }

   async markSuccess(id) {
      return transactionRepository.update(id, {
         status: "SUCCESS",
      })
   }

   async markFailed(id, reason) {
      return transactionRepository.update(id, {
         status: "FAILED",

         failureReason: reason,
      })
   }

   async getUserTransactions(userId) {
      return transactionRepository.findUserTransactions(userId)
   }
}

module.exports = new TransactionService()
