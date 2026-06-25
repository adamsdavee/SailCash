const chainService = require("../service/chain.service")

const { success } = require("../../../shared/utils/apiResponse")

exports.createChain = async (req, res, next) => {
   try {
      const chain = await chainService.createChain(req.body)

      return success(res, chain, "Chain created successfully")
   } catch (error) {
      next(error)
   }
}

exports.getChains = async (req, res, next) => {
   try {
      const chains = await chainService.getChains()

      return success(res, chains)
   } catch (error) {
      next(error)
   }
}
