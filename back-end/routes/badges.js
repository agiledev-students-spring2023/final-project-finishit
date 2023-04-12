/**
 * These are the routes for the /badges page on the front-end.
 */
const express = require('express')

const badgesRouter = express.Router()

const badges = [
    { id: 0, color: '#000000', text: 'Category 1' },
    { id: 1, color: '#ffffff', text: 'Category 2' },
    { id: 2, color: '#ff0000', text: 'Category 3' },
    { id: 3, color: '#ccff99', text: 'Category 4' },
    { id: 4, color: '#ff0000', text: 'Urgent' },
    { id: 5, color: '#f5b942', text: 'Medium Priority' },
    { id: 6, color: '#8d32a8', text: 'Tentative' }
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
        res.status(500).json({
            error: err,
            status: 'failed to retrieve badges from the database'
        })
    }
})

badgesRouter.get('/badges/:id', async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        const toRet = badges.find(ele => (ele.id === parseInt(req.params.id, 10)))
        if (toRet === undefined) {
            console.log(`Couldn't find badge while searching for ${req.params.id}`)
        } else {
            console.log(toRet)
        }
        res.json({
            badge: toRet ?? { id: parseInt(req.params.id, 10), color: '#0000ff', description: 'unfound' }
        })
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'failed to retrieve specified badge from the database'
        })
    }
})

badgesRouter.post('/badges/:id', async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        const toChange = badges.findIndex(ele => (ele.id === parseInt(req.params.id, 10)))
        badges[toChange] = req.body.editedBadge
        res.json({
            changedSuccess: true
        })
        console.log(badges[toChange])
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'failed to edit specified badge from the database'
        })
    }
})

module.exports = {
    badgesRouter,
    setError,
    default: badgesRouter
}
