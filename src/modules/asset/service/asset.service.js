const assetRepository = require("../repository/asset.repository")

const chainRepository = require("../../chain/repository/chain.repository")

const referenceGenerator = require("../../../shared/utils/referenceGenerator")

class AssetService {
   async createAsset(payload) {
      const chain = await chainRepository.findByCode(payload.chainCode)

      if (!chain) {
         throw new Error(`Chain ${payload.chainCode} not found`)
      }

      return assetRepository.create({
         reference: referenceGenerator.generate("AST"),

         assetCode: payload.assetCode,

         name: payload.name,

         symbol: payload.symbol,

         chainId: chain._id,

         type: payload.type,

         contractAddress: payload.contractAddress,

         decimals: payload.decimals,

         metadata: payload.metadata || {},
      })
   }

   async getAssets() {
      return assetRepository.findActiveAssets()
   }
}

module.exports = new AssetService()
