const User = require("../model/user.model")

class UserRepository {
   async create(payload) {
      return User.create(payload)
   }

   async findByPhoneNumber(phoneNumber) {
      return User.findOne({
         phoneNumber,
         isDeleted: false,
      })
   }

   async findById(id) {
      return User.findOne({
         _id: id,
         isDeleted: false,
      })
   }

   async update(id, payload) {
      return User.findByIdAndUpdate(id, payload, {
         new: true,
      })
   }

   async softDelete(id) {
      return User.findByIdAndUpdate(
         id,
         {
            isDeleted: true,
            deletedAt: new Date(),
         },
         {
            new: true,
         },
      )
   }
}

module.exports = new UserRepository()
