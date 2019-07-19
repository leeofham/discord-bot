const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./config/routes')
const { dbUri, port } = require('./config/environment')

const app = express()

mongoose.connect(dbUri)

app.use(bodyParser.json()) //allows us to handle json inputs, this creates req.body
app.use('/', routes)

app.listen(4000, () => console.log(`Bears are on port ${port}`))
