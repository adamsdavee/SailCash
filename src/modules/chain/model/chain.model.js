const mongoose = require("mongoose")

const chainSchema = new mongoose.Schema(
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

      code: {
         type: String,
         required: true,
         unique: true,
         index: true,
      },

      nativeCurrency: {
         type: String,
         required: true,
      },

      explorerUrl: {
         type: String,
         required: true,
      },

      confirmationsRequired: {
         type: Number,
         default: 12,
      },

      isActive: {
         type: Boolean,
         default: true,
      },
   },
   {
      timestamps: true,
   },
)

module.exports = mongoose.model("Chain", chainSchema)
