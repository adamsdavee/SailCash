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

      name: {
         type: String,
         required: true,
      },

      symbol: {
         type: String,
         required: true,
      },

      chain: {
         type: String,
         required: true,
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

assetSchema.index(
   {
      symbol: 1,
      chain: 1,
   },
   {
      unique: true,
   },
)

module.exports = mongoose.model("Asset", assetSchema)
