// The final error handler in the server

const logger = require("../logger/logger")

module.exports = (err, req, res, next) => {
   logger.error({
      message: err.message,
      stack: err.stack,
   })

   res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
   })
}
