const bankAccountRepository = require("../repository/bank-account.repository")
const ApiError = require("../../../shared/errors/ApiError")
const BankAccountMapper = require("../mapper/bank-account.mapper")

const { BANK_PROVIDERS } = require("../../../config/constants")

class BankAccountService {
   /**
    * Create a bank account.
    */
   async createBankAccount(data, session = null) {
      const exists = await bankAccountRepository.existsByAccountNumber(
         data.accountNumber,
      )

      if (exists) {
         throw new ApiError(409, "Bank account already exists.")
      }

      return bankAccountRepository.create(data, session)
   }

   /**
    * Get one bank account.
    */
   async getBankAccount(accountId) {
      const account = await bankAccountRepository.findById(accountId)

      if (!account) {
         throw new ApiError(404, "Bank account not found.")
      }

      return account
   }

   /**
    * Get all accounts for a user.
    */
   async getUserBankAccounts(userId) {
      return bankAccountRepository.findByUser(userId)
   }

   /**
    * Get the user's default funding account.
    */
   async getFundingAccount(userId) {
      const account =
         await bankAccountRepository.findPrimaryActiveByUser(userId)

      if (!account) {
         throw new ApiError(404, "No active funding account found.")
      }

      return account
   }

   /**
    * Activate a bank account.
    */
   async activateBankAccount(accountId, session = null) {
      const account = await this.getBankAccount(accountId)

      if (account.status === "ACTIVE") {
         return account
      }

      return bankAccountRepository.activate(accountId, session)
   }

   /**
    * Suspend a bank account.
    */
   async suspendBankAccount(accountId, session = null) {
      await this.getBankAccount(accountId)

      return bankAccountRepository.suspend(accountId, session)
   }

   /**
    * Reactivate a bank account.
    */
   async reactivateBankAccount(accountId, session = null) {
      await this.getBankAccount(accountId)

      return bankAccountRepository.reactivate(accountId, session)
   }

   /**
    * Close a bank account.
    */
   async closeBankAccount(accountId, session = null) {
      await this.getBankAccount(accountId)

      return bankAccountRepository.close(accountId, session)
   }

   /**
    * Make a bank account primary.
    */
   async setPrimaryBankAccount(accountId, userId, session = null) {
      await this.getBankAccount(accountId)

      return bankAccountRepository.setPrimary(accountId, userId, session)
   }

   /**
    * Creates a bank account from any supported provider.
    */
   async createFromProvider(
      provider,
      providerResponse,
      userId,
      session = null,
   ) {
      let data

      switch (provider) {
         case BANK_PROVIDERS.NOMBA:
            data = BankAccountMapper.fromNomba(providerResponse, userId)

            break

         case BANK_PROVIDERS.PAYSTACK:
            data = BankAccountMapper.fromPaystack(providerResponse, userId)

            break

         case BANK_PROVIDERS.MONNIFY:
            data = BankAccountMapper.fromMonnify(providerResponse, userId)

            break

         default:
            throw new ApiError(400, `Unsupported banking provider: ${provider}`)
      }

      return this.createBankAccount(data, session)
   }
}

module.exports = new BankAccountService()
