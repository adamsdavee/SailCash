const express = require("express")

const router = express.Router()

const transactionController = require("../controller/transaction.controller")

router.get("/transactions/:userId", transactionController.getUserTransactions)

module.exports = router
