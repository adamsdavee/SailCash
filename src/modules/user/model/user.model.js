const mongoose = require("mongoose")

const {
   USER_STATUS,
   KYC_STATUS,
   USER_TIERS,
} = require("../../../config/constants")

const userSchema = new mongoose.Schema(
   {
      reference: {
         type: String,
         required: true,
         unique: true,
         index: true,
      },

      phoneNumber: {
         type: String,
         required: true,
         unique: true,
         index: true,
      },

      whatsappUserId: {
         type: String,
         unique: true,
         sparse: true,
         index: true,
      },

      whatsappProfileName: {
         type: String,
      },

      firstName: {
         type: String,
      },

      lastName: {
         type: String,
      },

      email: {
         type: String,
      },

      country: {
         type: String,
         default: "NG",
      },

      dateOfBirth: {
         type: Date,
      },

      status: {
         type: String,
         enum: Object.values(USER_STATUS),
         default: USER_STATUS.ACTIVE,
      },

      kycStatus: {
         type: String,
         enum: Object.values(KYC_STATUS),
         default: KYC_STATUS.NOT_STARTED,
      },

      tier: {
         type: String,
         enum: Object.values(USER_TIERS),
         default: USER_TIERS.TIER_0,
      },

      kycProfileId: {
         type: mongoose.Schema.Types.ObjectId,
         default: null,
      },

      metadata: {
         type: Object,
         default: {},
      },

      isDeleted: {
         type: Boolean,
         default: false,
      },

      deletedAt: {
         type: Date,
         default: null,
      },
   },
   {
      timestamps: true,
   },
)

userSchema.index({
   status: 1,
})

userSchema.index({
   kycStatus: 1,
})

userSchema.index({
   createdAt: -1,
})

const User = mongoose.model("User", userSchema)
module.exports = User
