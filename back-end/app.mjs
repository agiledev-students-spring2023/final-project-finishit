import express from 'express'
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv'
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan'
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors'

// route imports
import badgesRouter from './routes/badges.mjs'
import tasksRouter from './routes/tasks.mjs'
import newrouter from './routes/NewTask.mjs'
import usersRouter from './routes/users.mjs'

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

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.use('/', badgesRouter)
app.use('/', tasksRouter)
app.use('/', newrouter)
app.use('/auth', usersRouter)

/*
app.post('/newtask', async(req, res) => {
    name:req.body
})

app.post('/edittask', async(req, res) => {

})

*/
export default app
