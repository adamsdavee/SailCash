const Balance = require("../model/balance.model")

class BalanceRepository {
   async createProjection(payload) {
      return Balance.create(payload)
   }

   async findByUserAndAsset(userId, assetId) {
      return Balance.findOne({
         userId,
         assetId,
      })
   }

   async findUserBalances(userId) {
      return Balance.find({
         userId,
      }).populate("assetId", "assetCode symbol")
   }

   async update(id, payload) {
      return Balance.findByIdAndUpdate(id, payload, {
         new: true,
      })
   }
}

module.exports = new BalanceRepository()
