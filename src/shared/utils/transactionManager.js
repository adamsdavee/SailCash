const mongoose = require("mongoose")

async function transactionManager(work) {
   const session = await mongoose.startSession()

   try {
      session.startTransaction()

      const result = await work(session)

      await session.commitTransaction()

      await session.endSession()

      return result
   } catch (error) {
      await session.abortTransaction()

      throw error
   } finally {
      if (session.inTransaction()) {
         await session.abortTransaction()
      }

      await session.endSession()
   }
}

module.exports = transactionManager
