const express = require("express")

const router = express.Router()

const systemRoutes = require("../modules/system/routes/system.routes")

const userRoutes = require("../modules/user/routes/user.routes")

const chainRoutes = require("../modules/chain/routes/chain.routes")

const assetRoutes = require("../modules/asset/routes/asset.routes")

router.use("/", systemRoutes)

router.use("/api/v1", userRoutes) // Admin only routes, not to be made public

router.use("/api/v1", chainRoutes) // Admin only routes, not to be made public

router.use("/api/v1", assetRoutes)

module.exports = router

// const express = require("express");

// const router = express.Router();

// router.get("/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Fintech API is running"
//   });
// });

// module.exports = router;
