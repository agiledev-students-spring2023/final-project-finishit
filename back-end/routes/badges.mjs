/**
 * These are the routes for the /badges page on the front-end.
 */
import express from 'express'

const badgesRouter = express.Router()

const sampleBadges = [
    { color: '#000000', text: 'Category 1' },
    { color: '#ffffff', text: 'Category 2' },
    { color: '#ff0000', text: 'Category 3' },
    { color: '#ccff99', text: 'Category 4' },
    { color: '#ff0000', text: 'Urgent' },
    { color: '#f5b942', text: 'Medium Priority' },
    { color: '#8d32a8', text: 'Tentative' }
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
