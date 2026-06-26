const mongoose = require("mongoose")

const {
   TRANSACTION_TYPES,
   TRANSACTION_STATUS,
} = require("../../../config/constants")

const transactionSchema = new mongoose.Schema(
   {
      reference: {
         type: String,
         required: true,
         unique: true,
         index: true,
      },

      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
         index: true,
      },

      assetId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Asset",
         required: true,
         index: true,
      },

      type: {
         type: String,
         enum: Object.values(TRANSACTION_TYPES),
         required: true,
      },

      amount: {
         type: String,
         required: true,
      },

      status: {
         type: String,
         enum: Object.values(TRANSACTION_STATUS),
         default: TRANSACTION_STATUS.PENDING,
      },

      metadata: {
         type: Object,
         default: {},
      },

      failureReason: {
         type: String,
         default: null,
      },
      idempotencyKey: {
         type: String,
         required: true,
         unique: true,
         index: true,
      },

      statusHistory: [
         {
            status: {
               type: String,
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
      ],
   },
   {
      timestamps: true,
   },
)

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
