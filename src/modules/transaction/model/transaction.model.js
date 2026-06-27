const mongoose = require("mongoose")

const {
   TRANSACTION_STATUS,
   TRANSACTION_TYPES,
   OPERATIONS,
} = require("../../../config/constants")

const transactionStatusHistorySchema = new mongoose.Schema(
   {
      status: {
         type: String,
         enum: Object.values(TRANSACTION_STATUS),
         required: true,
      },

      changedAt: {
         type: Date,
         default: Date.now,
      },

      reason: {
         type: String,
         default: null,
      },
   },
   {
      _id: false,
   },
)

const transactionSchema = new mongoose.Schema(
   {
      /**
       * Human-readable transaction reference.
       * Example:
       * TXN_20260715_AB12CD34
       */
      reference: {
         type: String,
         required: true,
         unique: true,
         index: true,
         trim: true,
      },

      /**
       * Idempotency key supplied by caller
       * (WhatsApp webhook, Nomba webhook, API, etc.)
       */
      idempotencyKey: {
         type: String,
         default: null,
         index: true,
      },

      /**
       * User initiating the transaction.
       */
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
         index: true,
      },

      /**
       * Asset being moved.
       */
      assetId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Asset",
         required: true,
         index: true,
      },

      /**
       * Transaction type.
       */
      type: {
         type: String,
         enum: Object.values(TRANSACTION_TYPES),
         required: true,
         index: true,
      },

      /**
       * Amount as Decimal128.
       */
      amount: {
         type: mongoose.Schema.Types.Decimal128,
         required: true,
      },

      /**
       * Current transaction status.
       */
      status: {
         type: String,
         enum: Object.values(TRANSACTION_STATUS),
         default: TRANSACTION_STATUS.PENDING,
         index: true,
      },

      /**
       * Complete lifecycle history.
       */
      statusHistory: {
         type: [transactionStatusHistorySchema],
         default: [
            {
               status: TRANSACTION_STATUS.PENDING,
               changedAt: new Date(),
            },
         ],
      },

      /**
       * Failure reason if transaction fails.
       */
      failureReason: {
         type: String,
         default: null,
      },

      /**
       * External provider reference.
       *
       * Examples:
       * - Nomba payment reference
       * - Blockchain hash
       */
      externalReference: {
         type: String,
         default: null,
         index: true,
      },

      /**
       * Optional description.
       */
      description: {
         type: String,
         default: null,
         trim: true,
      },

      /**
       * More specific business operation.
       *
       * Example:
       * INTERNAL_TRANSFER
       * BANK_DEPOSIT
       * CRYPTO_WITHDRAWAL
       * BUY_USDT
       */
      operation: {
         type: String,
         enum: Object.values(OPERATIONS),
         required: true,
         index: true,
      },

      /**
       * Flexible metadata.
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
 * Compound indexes
 */

// User transaction history
transactionSchema.index({
   userId: 1,
   createdAt: -1,
})

// Asset transaction history
transactionSchema.index({
   assetId: 1,
   createdAt: -1,
})

// User + Status lookup
transactionSchema.index({
   userId: 1,
   status: 1,
})

// External reference lookup
transactionSchema.index({
   externalReference: 1,
})

// Idempotency lookup
transactionSchema.index({
   idempotencyKey: 1,
})

transactionSchema.index({
   operation: 1,
   createdAt: -1,
})

module.exports = mongoose.model("Transaction", transactionSchema)

// initiator: {
//     type: String,
//     enum: [
//         "USER",
//         "SYSTEM",
//         "WEBHOOK",
//         "ADMIN"
//     ]
// }

// const mongoose = require("mongoose")

// const {
//    TRANSACTION_TYPES,
//    TRANSACTION_STATUS,
// } = require("../../../config/constants")

// const transactionSchema = new mongoose.Schema(
//    {
//       reference: {
//          type: String,
//          required: true,
//          unique: true,
//          index: true,
//       },

//       userId: {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "User",
//          required: true,
//          index: true,
//       },

//       assetId: {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "Asset",
//          required: true,
//          index: true,
//       },

//       type: {
//          type: String,
//          enum: Object.values(TRANSACTION_TYPES),
//          required: true,
//       },

//       amount: {
//          type: String,
//          required: true,
//       },

//       status: {
//          type: String,
//          enum: Object.values(TRANSACTION_STATUS),
//          default: TRANSACTION_STATUS.PENDING,
//       },

//       metadata: {
//          type: Object,
//          default: {},
//       },

//       failureReason: {
//          type: String,
//          default: null,
//       },
//       idempotencyKey: {
//          type: String,
//          required: true,
//          unique: true,
//          index: true,
//       },

//       statusHistory: [
//          {
//             status: {
//                type: String,
//                required: true,
//             },

//             changedAt: {
//                type: Date,
//                default: Date.now,
//             },

//             reason: {
//                type: String,
//                default: null,
//             },
//          },
//       ],
//    },
//    {
//       timestamps: true,
//    },
// )

// module.exports = mongoose.model("Transaction", transactionSchema)

// initiator: {
//     type: String,
//     enum: [
//         "USER",
//         "SYSTEM",
//         "WEBHOOK",
//         "ADMIN"
//     ]
// }
