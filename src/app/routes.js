const express = require("express")

const router = express.Router()

const systemRoutes = require("../modules/system/routes/system.routes")

router.use("/", systemRoutes)

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
