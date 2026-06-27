class LedgerPostingError extends Error {
   constructor(message, code = "LEDGER_POSTING_ERROR", statusCode = 400) {
      super(message)

      this.name = "LedgerPostingError"

      this.code = code

      this.statusCode = statusCode

      Error.captureStackTrace(this, this.constructor)
   }
}

module.exports = LedgerPostingError
