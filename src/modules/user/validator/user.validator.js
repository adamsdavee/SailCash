exports.validateCreateUser = (req, res, next) => {
   const { phoneNumber } = req.body

   if (!phoneNumber) {
      return res.status(400).json({
         success: false,
         message: "phoneNumber is required",
      })
   }

   next()
}
