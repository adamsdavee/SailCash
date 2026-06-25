const Asset = require("../model/asset.model")

class AssetRepository {
   async create(payload) {
      return Asset.create(payload)
   }

   async findActiveAssets() {
      return Asset.find({
         isActive: true,
      }).populate("chainId", "name code")
   }

   async findByAssetCode(assetCode) {
      return Asset.findOne({
         assetCode,
         isActive: true,
      }).populate("chainId", "name code")
   }
}

module.exports = new AssetRepository()
