const mongoose = require("mongoose")

const {
   BANK_PROVIDERS,
   BANK_ACCOUNT_STATUS,
} = require("../../../config/constants")

const bankAccountSchema = new mongoose.Schema(
   {
      /**
       * Owner of this bank account.
       */
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
         index: true,
      },

      /**
       * Banking provider.
       * Example:
       * NOMBA
       * PAYSTACK
       * MONNIFY
       */
      provider: {
         type: String,
         enum: Object.values(BANK_PROVIDERS),
         required: true,
         index: true,
      },

      /**
       * Generic provider identifier.
       */
      providerReference: {
         type: String,
         default: null,
         index: true,
      },

      /**
       * Provider customer identifier.
       */
      providerCustomerId: {
         type: String,
         default: null,
         index: true,
      },

      /**
       * Provider account identifier.
       */
      providerAccountId: {
         type: String,
         default: null,
         index: true,
      },

      /**
       * Reserved account number.
       */
      accountNumber: {
         type: String,
         required: true,
         unique: true,
         trim: true,
      },

      /**
       * Account name displayed by the bank.
       */
      accountName: {
         type: String,
         required: true,
         trim: true,
      },

      /**
       * Bank name.
       * Example:
       * Providus Bank
       */
      bankName: {
         type: String,
         required: true,
         trim: true,
      },

      /**
       * NIP bank code.
       */
      bankCode: {
         type: String,
         required: true,
      },

      /**
       * Fiat currency.
       */
      currency: {
         type: String,
         default: "NGN",
         uppercase: true,
         trim: true,
      },

      /**
       * Whether this is the user's default account.
       */
      isPrimary: {
         type: Boolean,
         default: true,
      },

      /**
       * Current account status.
       */
      status: {
         type: String,
         enum: Object.values(BANK_ACCOUNT_STATUS),
         default: BANK_ACCOUNT_STATUS.PENDING,
         index: true,
      },

      /**
       * Soft delete timestamp.
       *
       * Financial records should never be physically deleted
       * in production.
       */
      deletedAt: {
         type: Date,
         default: null,
         index: true,
      },

      /**
       * Timestamp when the account was activated.
       */
      activatedAt: {
         type: Date,
         default: null,
      },

      /**
       * Timestamp when the account was closed.
       */
      closedAt: {
         type: Date,
         default: null,
      },

      /**
       * Optional provider-specific information.
       */
      metadata: {
         type: mongoose.Schema.Types.Mixed,
         default: {},
      },
   },
   {
      timestamps: true,
      versionKey: false,
   },
)

/**
 * ==========================
 * Indexes
 * ==========================
 */

bankAccountSchema.index({
   userId: 1,
})

bankAccountSchema.index({
   provider: 1,
})

bankAccountSchema.index({
   providerReference: 1,
})

bankAccountSchema.index({
   providerCustomerId: 1,
})

bankAccountSchema.index({
   providerAccountId: 1,
})

bankAccountSchema.index({
   accountNumber: 1,
})

bankAccountSchema.index({
   userId: 1,
   provider: 1,
})

bankAccountSchema.index({
   userId: 1,
   isPrimary: 1,
})

module.exports = mongoose.model("BankAccount", bankAccountSchema)
