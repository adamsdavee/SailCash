const transactionService = require("../service/transaction.service")

const { success } = require("../../../shared/utils/apiResponse")

exports.getUserTransactions = async (req, res, next) => {
   try {
      const transactions = await transactionService.getUserTransactions(
         req.params.userId,
      )

      return success(res, transactions)
   } catch (error) {
      next(error)
   }
}
