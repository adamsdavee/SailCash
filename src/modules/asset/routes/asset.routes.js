const express = require("express")

const router = express.Router()

const assetController = require("../controller/asset.controller")

const { validateCreateAsset } = require("../validator/asset.validator")

router.post("/assets", validateCreateAsset, assetController.createAsset)

router.get("/assets", assetController.getAssets)

module.exports = router
