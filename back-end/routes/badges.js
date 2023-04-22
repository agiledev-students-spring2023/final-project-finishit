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

// retrieve all a user's badges
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
            status: 'Could not retrieve badges. Please try again later.'
        })
    }
})

// add new badge
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
            status: 'Could not add new badge. Please try again later.'
        })
    }
})

// retrieve individual badge data during editing
badgesRouter.get('/badges/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        const toRet = req.user.badges.find(ele => ele._id.toString() === req.params.id)
        res.json({
            badge: toRet
        })
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'Could not retrieve specified badge. Please try again later.'
        })
    }
})

// edit individual badge
badgesRouter.post('/badges/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        const toChange = req.user.badges[req.user.badges
            .findIndex(ele => ele._id.toString() === req.params.id)]
        toChange.text = req.body.editedBadge.text
        toChange.color = req.body.editedBadge.color
        // await toChange.save()
        await req.user.save()
        res.json({
            changedSuccess: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: 'Could not edit specified badge. Please try again later.'
        })
    }
})

// delete a badge
badgesRouter.get('/rmBadge/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        const toRm = req.user.badges.findIndex(ele => ele._id.toString() === req.params.id)
        req.user.badges.splice(toRm, 1)
        await req.user.save()
        res.json({
            deleteSuccess: true
        })
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'Could not delete specified badge. Please try again later.'
        })
    }
})

module.exports = {
    badgesRouter,
    setError,
    default: badgesRouter
}
