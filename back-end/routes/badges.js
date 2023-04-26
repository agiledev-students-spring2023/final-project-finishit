/**
 * These are the routes for the /badges page on the front-end.
 */
const express = require('express')
const passport = require('passport')
const sanitize = require('mongo-sanitize')
const Badge = require('../models/Badge')
const User = require('../models/User')

const badgesRouter = express.Router()
const badgePattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/

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
        if (!req.body.newBadge.text || req.body.newBadge.text.length === 0) {
            res.json({
                status: 'Please specify a name for your badge.'
            })
            return
        }
        if (!req.body.newBadge.color || !req.body.newBadge.color.match(badgePattern)) {
            res.json({
                status: 'Please select a valid color.'
            })
            return
        }
        const badgeToSave = new Badge({
            text: sanitize(req.body.newBadge.text),
            color: sanitize(req.body.newBadge.color)
        })
        req.user.badges.push(badgeToSave)
        await req.user.save()
        res.json({
            addSuccess: true
        })
    } catch (err) {
        console.log(err)
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
        const toRet = req.user.badges.find(ele => ele._id.toString() === sanitize(req.params.id))
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
        if (!req.body.editedBadge.text || req.body.editedBadge.text.length === 0) {
            res.json({
                status: 'Please specify a name for your badge.'
            })
            return
        }
        if (!req.body.editedBadge.color || !req.body.editedBadge.color.match(badgePattern)) {
            res.json({
                status: 'Please select a valid color.'
            })
            return
        }
        const toChange = req.user.badges[req.user.badges
            .findIndex(ele => ele._id.toString() === sanitize(req.params.id))]
        toChange.text = sanitize(req.body.editedBadge.text)
        toChange.color = sanitize(req.body.editedBadge.color)
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
        const toRm = req.user.badges.findIndex(
            ele => ele._id.toString() === sanitize(req.params.id)
        )
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
