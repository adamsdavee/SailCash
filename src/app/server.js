const app = require("./app")

const env = require("../config/env")

const connectDatabase = require("../startup/database")

const initializeBlockchain = require("../startup/blockchain")

const initializeLangGraph = require("../startup/langgraph")

const initializeScheduler = require("../startup/scheduler")

const logger = require("../shared/logger/logger")

async function startServer() {
   try {
      await connectDatabase()

      await initializeBlockchain()

      await initializeLangGraph()

      await initializeScheduler()

      app.listen(env.PORT, () => {
         logger.info(`Server running on port ${env.PORT}`)
      })
   } catch (error) {
      logger.error(error)

      process.exit(1)
   }
}

startServer()
