const express = require('express')
// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv')
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan')
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors')

// route imports
const badgesRouter = require('./routes/badges').badgesRouter
const tasksRouter = require('./routes/tasks').tasksRouter
const newrouter = require('./routes/NewTask').newrouter
const usersRouter = require('./routes/users').usersRouter
const editrouter = require('./routes/EditTask').editrouter

const app = express()
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
dotenv.config({ silent: true })
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }))
app.use(cors())

// middleware to parse JSON bodies
app.use(express.json())

// middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

app.use('/', badgesRouter)
app.use('/', tasksRouter)
app.use('/', newrouter)
app.use('/', editrouter)
app.use('/auth', usersRouter)

module.exports = {
    app,
    default: app
}
