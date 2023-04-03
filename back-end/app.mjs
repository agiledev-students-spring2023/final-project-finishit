import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

// route imports
import badgesRouter from './routes/badges.mjs'
import tasksRouter from './routes/tasks.mjs'
import newrouter from './routes/NewTask.mjs'

const app = express()
dotenv.config({ silent: true })
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.use('/', badgesRouter)
app.use('/', tasksRouter)
app.use('/', newrouter)

/*
app.post('/newtask', async(req, res) => {
    name:req.body
})

app.post('/edittask', async(req, res) => {

})

*/
export default app
