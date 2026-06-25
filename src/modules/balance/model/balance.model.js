const mongoose = require("mongoose")

const balanceSchema = new mongoose.Schema(
   {
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

      availableBalance: {
         type: mongoose.Schema.Types.Decimal128,
         default: 0,
      },

      pendingBalance: {
         type: mongoose.Schema.Types.Decimal128,
         default: 0,
      },

      lockedBalance: {
         type: mongoose.Schema.Types.Decimal128,
         default: 0,
      },

      lastLedgerEntryId: {
         type: mongoose.Schema.Types.ObjectId,
         default: null,
         index: true,
      },

      lastProjectedAt: {
         type: Date,
         default: null,
      },
   },
   {
      timestamps: true,
   },
)

balanceSchema.index(
   {
      userId: 1,
      assetId: 1,
   },
   {
      unique: true,
   },
)

balanceSchema.set("toJSON", {
   transform: (doc, ret) => {
      ret.availableBalance = ret.availableBalance?.toString()

      ret.pendingBalance = ret.pendingBalance?.toString()

      ret.lockedBalance = ret.lockedBalance?.toString()

      return ret
   },
})

module.exports = mongoose.model("Balance", balanceSchema)
