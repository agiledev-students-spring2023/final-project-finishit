// load environmental variables from a hidden file named .env
import express from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
// middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
dotenv.config({ silent: true }) 

const app = express()

app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello!')
})

const sampleBadges = [
    { color: '#000000', text: 'These' },
    { color: '#ffffff', text: 'badges' },
    { color: '#ff0000', text: 'are' },
    { color: '#ccff99', text: 'from' },
    { color: '#ff0000', text: 'the' },
    { color: '#f5b942', text: 'backend' },
]

// transfers badge data from db to /badgehome on front-end
app.get('/badges', async (req, res) => {
    try {
        res.json({
            badges: sampleBadges,
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({
            error: err,
            status: 'failed to retrieve badges from the database',
        })
    }
})

export default app
