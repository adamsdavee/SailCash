const {
   BANK_PROVIDERS,
   BANK_ACCOUNT_STATUS,
} = require("../../../config/constants")

class BankAccountMapper {
   /**
    * Maps a Nomba response into our internal model.
    */
   static fromNomba(providerResponse, userId) {
      return {
         userId,

         provider: BANK_PROVIDERS.NOMBA,

         providerReference:
            providerResponse.reservationReference ??
            providerResponse.providerReference ??
            null,

         providerCustomerId:
            providerResponse.customerId ??
            providerResponse.providerCustomerId ??
            null,

         providerAccountId:
            providerResponse.accountId ??
            providerResponse.providerAccountId ??
            null,

         accountNumber: providerResponse.accountNumber,

         accountName: providerResponse.accountName,

         bankName: providerResponse.bankName,

         bankCode: providerResponse.bankCode,

         currency: providerResponse.currency || "NGN",

         status: BANK_ACCOUNT_STATUS.ACTIVE,

         metadata: {
            provider: "NOMBA",
            raw: providerResponse,
         },
      }
   }

   /**
    * Placeholder for future Paystack support.
    */
   static fromPaystack(providerResponse, userId) {
      throw new Error("Paystack mapper not implemented.")
   }

   /**
    * Placeholder for future Monnify support.
    */
   static fromMonnify(providerResponse, userId) {
      throw new Error("Monnify mapper not implemented.")
   }
}

module.exports = BankAccountMapper
