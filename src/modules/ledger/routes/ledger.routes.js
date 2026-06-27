const express = require("express")

const router = express.Router()

const ledgerController = require("../controller/ledger.controller")

// Route usage for only admin

router.get("/ledger/:transactionId", ledgerController.getTransactionLedger)

module.exports = router
