const express = require("express")

const router = express.Router()

const chainController = require("../controller/chain.controller")

router.post("/chains", chainController.createChain)

router.get("/chains", chainController.getChains)

module.exports = router
