const assetService = require("../service/asset.service")

const { success } = require("../../../shared/utils/apiResponse")

exports.createAsset = async (req, res, next) => {
   try {
      const asset = await assetService.createAsset(req.body)

      return success(res, asset, "Asset created successfully")
   } catch (error) {
      next(error)
   }
}

exports.getAssets = async (req, res, next) => {
   try {
      const assets = await assetService.getAssets()

      return success(res, assets)
   } catch (error) {
      next(error)
   }
}
