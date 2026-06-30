const Joi = require("joi")
const {
   BANK_PROVIDERS,
   BANK_ACCOUNT_STATUS,
} = require("../../../config/constants")

const createBankAccountSchema = Joi.object({
   userId: Joi.string().required(),

   provider: Joi.string()
      .valid(...Object.values(BANK_PROVIDERS))
      .required(),

   providerReference: Joi.string().allow(null, ""),

   providerCustomerId: Joi.string().allow(null, ""),

   providerAccountId: Joi.string().allow(null, ""),

   accountNumber: Joi.string().required(),

   accountName: Joi.string().required(),

   bankName: Joi.string().required(),

   bankCode: Joi.string().required(),

   currency: Joi.string().default("NGN"),

   status: Joi.string()
      .valid(...Object.values(BANK_ACCOUNT_STATUS))
      .default(BANK_ACCOUNT_STATUS.PENDING),

   metadata: Joi.object().default({}),
})

module.exports = {
   createBankAccountSchema,
}
