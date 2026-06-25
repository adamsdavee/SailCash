// Logging each request in the server

const logger = require("../logger/logger")

module.exports = (req, res, next) => {
   console.log(req.method, req.originalUrl)
   logger.info(`Received ${req.method} request to ${req.url}`)
   logger.info(`Request body: ${req.body}`)

   next()
}
