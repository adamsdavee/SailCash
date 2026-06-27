const mongoose = require("mongoose")

async function mongoTransaction(work) {
   const session = await mongoose.startSession()

   session.startTransaction()

   try {
      const result = await work(session)

      await session.commitTransaction()

      return result
   } catch (error) {
      await session.abortTransaction()

      throw error
   } finally {
      session.endSession()
   }
}

module.exports = mongoTransaction
