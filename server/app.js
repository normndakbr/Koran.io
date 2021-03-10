const { urlencoded } = require('express')
const express = require('express')
const app = express()
const PORT = 3000

app.use(express.urlencoded({extended: false}))
app.listen(() => {
    console.log("Application is listening on http://localhost:", + PORT)
})