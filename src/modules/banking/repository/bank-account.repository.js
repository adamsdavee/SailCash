const BankAccount = require("../model/bank-account.model")

const { BANK_ACCOUNT_STATUS } = require("../../../config/constants")

class BankAccountRepository {
   /**
    * Create a bank account.
    */
   async create(data, session = null) {
      const account = new BankAccount(data)

      await account.save({ session })

      return account
   }

   /**
    * Find by Mongo ID.
    */
   async findById(id, options = {}) {
      const query = BankAccount.findById(id)

      if (options.populateUser) {
         query.populate("userId")
      }

      return query
   }

   /**
    * Find by account number.
    */
   async findByAccountNumber(accountNumber) {
      return BankAccount.findOne({
         accountNumber,
      })
   }

   /**
    * Check if an account number already exists.
    */
   async existsByAccountNumber(accountNumber) {
      return BankAccount.exists({
         accountNumber,
      })
   }

   /**
    * Find by provider reference.
    */
   async findByProviderReference(providerReference) {
      return BankAccount.findOne({
         providerReference,
      })
   }

   /**
    * Find by provider account ID.
    */
   async findByProviderAccountId(providerAccountId) {
      return BankAccount.findOne({
         providerAccountId,
      })
   }

   /**
    * Find by provider customer ID.
    */
   async findByProviderCustomerId(providerCustomerId) {
      return BankAccount.findOne({
         providerCustomerId,
      })
   }

   /**
    * Get all accounts belonging to a user.
    */
   async findByUser(userId) {
      return BankAccount.find({
         userId,
      }).sort({
         createdAt: -1,
      })
   }

   /**
    * Get all ACTIVE accounts for a user.
    */
   async findActiveByUser(userId) {
      return BankAccount.find({
         userId,

         status: BANK_ACCOUNT_STATUS.ACTIVE,
      }).sort({
         createdAt: -1,
      })
   }

   /**
    * Get user's primary account.
    */
   async findPrimaryByUser(userId) {
      return BankAccount.findOne({
         userId,

         isPrimary: true,
      })
   }

   /**
    * Get user's primary ACTIVE account.
    */
   async findPrimaryActiveByUser(userId) {
      return BankAccount.findOne({
         userId,

         isPrimary: true,

         status: BANK_ACCOUNT_STATUS.ACTIVE,
      })
   }

   /**
    * Generic update helper.
    */
   async update(accountId, updates, session = null) {
      return BankAccount.findByIdAndUpdate(
         accountId,

         updates,

         {
            new: true,
            session,
         },
      )
   }

   /**
    * Activate account.
    */
   async activate(accountId, session = null) {
      return this.update(
         accountId,

         {
            status: BANK_ACCOUNT_STATUS.ACTIVE,

            activatedAt: new Date(),
         },

         session,
      )
   }

   /**
    * Suspend account.
    */
   async suspend(accountId, session = null) {
      return this.update(
         accountId,

         {
            status: BANK_ACCOUNT_STATUS.SUSPENDED,
         },

         session,
      )
   }

   /**
    * Reactivate account.
    */
   async reactivate(accountId, session = null) {
      return this.update(
         accountId,

         {
            status: BANK_ACCOUNT_STATUS.ACTIVE,
         },

         session,
      )
   }

   /**
    * Close account.
    */
   async close(accountId, session = null) {
      return this.update(
         accountId,

         {
            status: BANK_ACCOUNT_STATUS.CLOSED,

            closedAt: new Date(),
         },

         session,
      )
   }

   /**
    * Mark this account as the user's primary account.
    */
   async setPrimary(accountId, userId, session = null) {
      // Remove primary flag from every account
      await BankAccount.updateMany(
         {
            userId,
         },

         {
            isPrimary: false,
         },

         {
            session,
         },
      )

      // Set selected account as primary
      return this.update(
         accountId,

         {
            isPrimary: true,
         },

         session,
      )
   }

   /**
    * Soft delete account.
    */
   async softDelete(accountId, session = null) {
      const account = await BankAccount.findById(accountId)

      if (!account) {
         return null
      }

      account.deletedAt = new Date()

      await account.save({ session })

      return account
   }
}

module.exports = new BankAccountRepository()
