const express = require("express")

const router = express.Router()

const systemRoutes = require("../modules/system/routes/system.routes")

const userRoutes = require("../modules/user/routes/user.routes")

router.use("/", systemRoutes)

router.use("/api/v1", userRoutes)

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
