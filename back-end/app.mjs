// load environmental variables from a hidden file named .env
import express from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

// route imports
import badgesRouter from './routes/badges.mjs'

dotenv.config({ silent: true })

const app = express()

app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.use('/', badgesRouter)

export default app
