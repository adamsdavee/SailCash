const bankAccountService = require("../service/bank-account.service")
const {
   createBankAccountSchema,
} = require("../validator/bank-account.validator")

class BankAccountController {
   async create(req, res, next) {
      try {
         const { error, value } = createBankAccountSchema.validate(req.body)

         if (error) {
            return next(error)
         }

         const account = await bankAccountService.createBankAccount(value)

         return res.status(201).json({
            success: true,
            data: account,
         })
      } catch (error) {
         next(error)
      }
   }

   async getById(req, res, next) {
      try {
         const account = await bankAccountService.getBankAccount(req.params.id)

         return res.json({
            success: true,
            data: account,
         })
      } catch (error) {
         next(error)
      }
   }

   async getByUser(req, res, next) {
      try {
         const accounts = await bankAccountService.getUserBankAccounts(
            req.params.userId,
         )

         return res.json({
            success: true,
            data: accounts,
         })
      } catch (error) {
         next(error)
      }
   }

   async getFundingAccount(req, res, next) {
      try {
         const account = await bankAccountService.getFundingAccount(
            req.params.userId,
         )

         return res.json({
            success: true,
            data: account,
         })
      } catch (error) {
         next(error)
      }
   }
}

module.exports = new BankAccountController()
