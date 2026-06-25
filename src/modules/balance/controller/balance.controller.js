const balanceService = require("../service/balance.service")

const { success } = require("../../../shared/utils/apiResponse")

exports.getUserBalances = async (req, res, next) => {
   try {
      // User balances is not being populated yet
      const balances = await balanceService.getUserBalances(req.params.userId)

      return success(res, balances)
   } catch (error) {
      next(error)
   }
}
