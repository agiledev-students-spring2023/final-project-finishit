// NPM imports.
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')

// Route imports.
const badgesRouter = require('./routes/badges').badgesRouter
const tasksRouter = require('./routes/tasks').tasksRouter
const newrouter = require('./routes/NewTask').newrouter
const usersRouter = require('./routes/users').usersRouter
const editrouter = require('./routes/EditTask').editrouter

const jwtStrategy = require('./config/jwtconfig')

// Initialize express app.
const app = express()

// Tell express to use certain middleware (imported above).
dotenv.config({ silent: true })
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
passport.use(jwtStrategy)
app.use(passport.initialize())

// Connect to MongoDB.
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB.')
}).catch(err => {
    console.log(`Error connecting to MongoDB: ${err}`)
})

// Specify routes (imported above).
app.use('/', badgesRouter)
app.use('/', tasksRouter)
app.use('/', newrouter)
app.use('/', editrouter)
app.use('/auth', usersRouter)

module.exports = {
    app,
    default: app
}
