const userRepository = require("../repository/user.repository")

const referenceGenerator = require("../../../shared/utils/referenceGenerator")

class UserService {
   async createUser(payload) {
      const existingUser = await userRepository.findByPhoneNumber(
         payload.phoneNumber,
      )

      if (existingUser) {
         return existingUser
      }

      return userRepository.create({
         ...payload,
         reference: referenceGenerator.user(),
      })
   }

   async getUserByPhone(phoneNumber) {
      return userRepository.findByPhoneNumber(phoneNumber)
   }

   async getUserById(id) {
      return userRepository.findById(id)
   }
}

module.exports = new UserService()
