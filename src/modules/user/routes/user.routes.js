const express = require("express")

const router = express.Router()

const userController = require("../controller/user.controller")

const { validateCreateUser } = require("../validator/user.validator")

router.post("/users", validateCreateUser, userController.createUser)

router.get("/users/:phoneNumber", userController.getUserByPhone)

module.exports = router
