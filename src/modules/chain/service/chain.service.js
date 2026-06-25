const chainRepository = require("../repository/chain.repository")

const referenceGenerator = require("../../../shared/utils/referenceGenerator")

class ChainService {
   async createChain(payload) {
      return chainRepository.create({
         ...payload,
         reference: referenceGenerator.generate("CHN"),
      })
   }

   async getChains() {
      return chainRepository.findAll()
   }
}

module.exports = new ChainService()
