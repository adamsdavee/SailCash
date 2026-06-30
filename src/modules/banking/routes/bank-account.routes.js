const express = require("express")

const router = express.Router()

const controller = require("../controller/bank-account.controller")

/**
 * Temporary endpoints for Phase 7.1
 */

router.post("/accounts", controller.create)

router.get("/accounts/:id", controller.getById)

router.get("/users/:userId/accounts", controller.getByUser)

router.get("/users/:userId/funding-account", controller.getFundingAccount)

module.exports = router
