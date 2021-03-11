const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandlers')
require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(routes)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log("Application is listening on http://localhost:" + PORT)
})