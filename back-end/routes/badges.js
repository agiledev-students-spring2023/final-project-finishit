/**
 * These are the routes for badges.
 */
const express = require('express')
const passport = require('passport')
const sanitize = require('mongo-sanitize')
const { body, validationResult } = require('express-validator')
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
        res.json({ badges: req.user.badges })
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'Could not retrieve badges. Please try again later.'
        })
    }
})

// add new badge
badgesRouter.post('/badges', [
    passport.authenticate('jwt', { session: false }),
    body('newBadge.text', 'Please specify a valid name for your badge').not().isEmpty()?.escape(),
    body('newBadge.color', 'Please select a valid color').not().isEmpty()?.escape()
        .custom((val, { req }) => val.match(badgePattern))
], async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        const valErrors = validationResult(req).array().map(val => val.msg)
        if (valErrors.length) {
            res.json({ status: valErrors })
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
        if (toRet === undefined) {
            res.json({ invalidID: true })
            return
        }
        res.json({ badge: toRet })
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'Could not retrieve specified badge. Please try again later.'
        })
    }
})

// edit individual badge
badgesRouter.post('/badges/:id', [
    passport.authenticate('jwt', { session: false }),
    body('editedBadge.text', 'Please specify a valid name for your badge').not().isEmpty()?.escape(),
    body('editedBadge.color', 'Please select a valid color').not().isEmpty()?.escape()
        .custom((val, { req }) => val.match(badgePattern))
], async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        const valErrors = validationResult(req).array().map(val => val.msg)
        if (valErrors.length) {
            res.json({ status: valErrors })
            return
        }

        const toChange = req.user.badges[req.user.badges
            .findIndex(ele => ele._id.toString() === sanitize(req.params.id))]
        if (!toChange) {
            res.json({ invalidID: true })
            return
        }
        toChange.text = sanitize(req.body.editedBadge.text)
        toChange.color = sanitize(req.body.editedBadge.color)
        await req.user.save()
        res.json({ changedSuccess: true })
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
        if (!toRm) {
            res.json({ invalidID: true })
            return
        }
        req.user.badges.splice(toRm, 1)
        await req.user.save()
        res.json({ deleteSuccess: true })
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
