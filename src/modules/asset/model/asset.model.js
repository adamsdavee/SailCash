const mongoose = require("mongoose")

const { ASSET_TYPES } = require("../../../config/constants")

const assetSchema = new mongoose.Schema(
   {
      reference: {
         type: String,
         required: true,
         unique: true,
         index: true,
      },

      assetCode: {
         type: String,
         required: true,
         unique: true,
         index: true,
      },

      name: {
         type: String,
         required: true,
      },

      symbol: {
         type: String,
         required: true,
      },

      chainId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Chain",
         required: true,
         index: true,
      },

      type: {
         type: String,
         enum: Object.values(ASSET_TYPES),
         required: true,
      },

      contractAddress: {
         type: String,
         default: null,
      },

      decimals: {
         type: Number,
         required: true,
      },

      isActive: {
         type: Boolean,
         default: true,
      },

      metadata: {
         type: Object,
         default: {},
      },
   },
   {
      timestamps: true,
   },
)

module.exports = mongoose.model("Asset", assetSchema)
