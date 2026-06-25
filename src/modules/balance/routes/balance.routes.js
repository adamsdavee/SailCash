const express = require("express")

const router = express.Router()

const balanceController = require("../controller/balance.controller")

router.get("/balances/:userId", balanceController.getUserBalances)

module.exports = router
