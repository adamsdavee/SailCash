exports.validateCreateAsset = (req, res, next) => {
   const { name, symbol, chain, type } = req.body

   if (!name || !symbol || !chain || !type) {
      return res.status(400).json({
         success: false,
         message: "Missing required fields",
      })
   }

   next()
}
