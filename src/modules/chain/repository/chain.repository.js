const Chain = require("../model/chain.model")

class ChainRepository {
   async create(payload) {
      return Chain.create(payload)
   }

   async findById(id) {
      return Chain.findById(id)
   }

   async findByCode(code) {
      return Chain.findOne({
         code,
         isActive: true,
      })
   }

   async findAll() {
      return Chain.find({
         isActive: true,
      })
   }
}

module.exports = new ChainRepository()
