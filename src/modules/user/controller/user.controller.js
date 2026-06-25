const userService = require("../service/user.service")

const { success } = require("../../../shared/utils/apiResponse")

// Comes in json(req.body)
exports.createUser = async (req, res, next) => {
   try {
      // CHeck if user exists before creating a new user
      const user = await userService.createUser(req.body)

      return success(res, user, "User created successfully")
   } catch (error) {
      next(error)
   }
}

// Use params
exports.getUserByPhone = async (req, res, next) => {
   try {
      const user = await userService.getUserByPhone(req.params.phoneNumber)

      return success(res, user)
   } catch (error) {
      next(error)
   }
}
