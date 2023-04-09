const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')

// route imports
const badgesRouter = require('./badges.js')
const tasksRouter = require('./tasks.js')

const app = express()
dotenv.config({ silent: true })
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }))
app.use(cors())

app.use('/', badgesRouter.badgesRouter)
app.use('/', tasksRouter.tasksRouter)

module.exports = {
    app
}
