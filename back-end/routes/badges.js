/**
 * These are the routes for the /badges page on the front-end.
 */
const express = require('express')
const passport = require('passport')
const Badge = require('../models/Badge')
const User = require('../models/User')

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

badgesRouter.get('/badges', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        res.json({
            badges: req.user.badges
        })
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'failed to retrieve badges from the database'
        })
    }
})

badgesRouter.post('/badges', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        // badges.push(req.body.newBadge)
        const badgeToSave = new Badge({
            text: req.body.newBadge.text,
            color: req.body.newBadge.color
        })
        req.user.badges.push(badgeToSave)
        await req.user.save()
        res.json({
            addSuccess: true
        })
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'failed to add new badge from the database'
        })
    }
})

badgesRouter.get('/badges/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        // const curUser = await User.findById(req.user._id)
        const toRet = req.user.badges.find(ele => ele._id === req.params.id)
        res.json({
            badge: toRet
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
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'failed to edit specified badge from the database'
        })
    }
})

badgesRouter.get('/rmBadge/:id', async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        const toRm = badges.findIndex(ele => (ele.id === parseInt(req.params.id, 10)))
        badges.splice(toRm, 1)
        res.json({
            deleteSuccess: true
        })
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
