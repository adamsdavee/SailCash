const Asset = require("../model/asset.model")

class AssetRepository {
   async create(payload) {
      return Asset.create(payload)
   }

   async findById(id) {
      return Asset.findById(id)
   }

   async findBySymbolAndChain(symbol, chain) {
      return Asset.findOne({
         symbol,
         chain,
         isActive: true,
      })
   }

   async findActiveAssets() {
      return Asset.find({
         isActive: true,
      })
   }
}

module.exports = new AssetRepository()
