const mongoose = require("mongoose")

const {
   LEDGER_ENTRY_TYPES,
   LEDGER_BALANCE_TYPES,
   LEDGER_OWNER_TYPES,
} = require("../../../config/constants")

const ledgerSchema = new mongoose.Schema(
   {
      transactionId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Transaction",
         required: true,
         index: true,
      },

      ownerType: {
         type: String,
         enum: Object.values(LEDGER_OWNER_TYPES),
         required: true,
         index: true,
      },

      ownerId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         index: true,
      },

      assetId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Asset",
         required: true,
         index: true,
      },

      entryType: {
         type: String,
         enum: Object.values(LEDGER_ENTRY_TYPES),
         required: true,
      },

      balanceType: {
         type: String,
         enum: Object.values(LEDGER_BALANCE_TYPES),
         required: true,
      },

      amount: {
         type: String,
         required: true,
      },

      description: {
         type: String,
         default: null,
      },

      metadata: {
         type: mongoose.Schema.Types.Mixed,
         default: {},
      },
   },
   {
      timestamps: true,
   },
)

ledgerSchema.index({
   transactionId: 1,
})

ledgerSchema.index({
   ownerType: 1,
   ownerId: 1,
   assetId: 1,
   createdAt: -1,
})

module.exports = mongoose.model("LedgerEntry", ledgerSchema)
