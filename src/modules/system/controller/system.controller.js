const { success } = require("../../../shared/utils/apiResponse")

exports.healthCheck = async (req, res) => {
   return success(res, {}, "Fintech API is running")
}
