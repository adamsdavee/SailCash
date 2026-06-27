const express = require("express")

const router = express.Router()

const ledgerController = require("../controller/ledger.controller")

router.get("/ledger/:transactionId", ledgerController.getTransactionLedger)

module.exports = router
