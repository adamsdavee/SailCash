const assetRepository = require("../repository/asset.repository")

const referenceGenerator = require("../../../shared/utils/referenceGenerator")

class AssetService {
   async createAsset(payload) {
      return assetRepository.create({
         ...payload,
         reference: referenceGenerator.generate("AST"),
      })
   }

   async getAssets() {
      return assetRepository.findActiveAssets()
   }
}

module.exports = new AssetService()
