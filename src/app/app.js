const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const routes = require("./routes")
const requestLogger = require("../shared/middleware/requestLogger")
const errorHandler = require("../shared/errors/errorHandler")

const app = express()

app.use(helmet())

app.use(cors())

app.use(express.json())

app.use(requestLogger)

app.use(routes)

app.use(errorHandler)

module.exports = app
