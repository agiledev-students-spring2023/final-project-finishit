/**
 * These are the routes for the /badges page on the front-end.
 */
import express from 'express'

const badgesRouter = express.Router()

const sampleBadges = [
    { color: '#000000', text: 'These' },
    { color: '#ffffff', text: 'badges' },
    { color: '#ff0000', text: 'are' },
    { color: '#ccff99', text: 'from' },
    { color: '#ff0000', text: 'the' },
    { color: '#f5b942', text: 'backend' }
]

badgesRouter.get('/badges', async (req, res) => {
    try {
        res.json({
            badges: sampleBadges
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({
            error: err,
            status: 'failed to retrieve badges from the database'
        })
    }
})

export default badgesRouter
