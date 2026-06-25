require("dotenv").config()

module.exports = {
   NODE_ENV: process.env.NODE_ENV,
   PORT: process.env.PORT,
   MONGODB_URI: process.env.MONGO_DB_CONNECTION_URL,
   LOG_LEVEL: process.env.LOG_LEVEL,
}
