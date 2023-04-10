const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')

// route imports
const badgesRouter = require('./routes/badges.js')
const tasksRouter = require('./routes/tasks.js')

const app = express()
dotenv.config({ silent: true })
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }))
app.use(cors())

app.use('/', badgesRouter.badgesRouter)
app.use('/', tasksRouter.tasksRouter)

module.exports = {
    app,
    default: app
}
