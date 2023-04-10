/**
 * These are the routes for the /badges page on the front-end.
 */
const express = require('express')

const badgesRouter = express.Router()

const badges = [
    { color: '#000000', text: 'Category 1' },
    { color: '#ffffff', text: 'Category 2' },
    { color: '#ff0000', text: 'Category 3' },
    { color: '#ccff99', text: 'Category 4' },
    { color: '#ff0000', text: 'Urgent' },
    { color: '#f5b942', text: 'Medium Priority' },
    { color: '#8d32a8', text: 'Tentative' }
]

let devError = false

function setError(err) {
    devError = err
}

badgesRouter.get('/badges', async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        res.json({
            badges
        })
    } catch (err) {
        // console.error(err)
        res.status(500).json({
            error: err,
            status: 'failed to retrieve badges from the database'
        })
    }
})

module.exports = {
    badgesRouter,
    setError,
    default: badgesRouter
}
