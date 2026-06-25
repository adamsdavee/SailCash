exports.validateCreateAsset = (req, res, next) => {
   const { assetCode, name, symbol, chainCode, type, decimals } = req.body

   if (
      !assetCode ||
      !name ||
      !symbol ||
      !chainCode ||
      !type ||
      decimals === undefined
   ) {
      return res.status(400).json({
         success: false,
         message:
            "assetCode, name, symbol, chainCode, type and decimals are required",
      })
   }

   next()
}
