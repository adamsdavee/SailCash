const crypto = require("crypto")

class ReferenceGenerator {
   generate(prefix) {
      const timestamp = Date.now().toString().slice(-6)

      const random = crypto.randomBytes(3).toString("hex").toUpperCase()

      return `${prefix}_${timestamp}${random}`
   }

   user() {
      return this.generate("USR")
   }

   transaction() {
      return this.generate("TXN")
   }

   ledger() {
      return this.generate("LDG")
   }

   transfer() {
      return this.generate("TRF")
   }

   withdrawal() {
      return this.generate("WDR")
   }

   deposit() {
      return this.generate("DEP")
   }

   treasury() {
      return this.generate("TRY")
   }

   audit() {
      return this.generate("AUD")
   }
}

module.exports = new ReferenceGenerator()
