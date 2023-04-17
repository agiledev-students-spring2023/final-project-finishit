// NPM imports.
const express = require('express')
const jwt = require('jsonwebtoken')
const path = require('path')
const passport = require('passport')

// Model imports.
const User = require('../models/User')

const usersRouter = express.Router()

// Returns the user if found, otherwise returns null.
// (Error checking should be done by whichever function calls this.)
const findUserByUsername = async username => {
    let user = await User.findOne({ username }).exec()
    if (!user) user = null
    return user
}

// Authenticated route!
usersRouter.get('/userInfo', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user)
})

// Authenticated route!
usersRouter.get('/change/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Change a user's username.
    const newUsername = 'test'
    User.updateOne({ _id: req.user._id }, { $set: { username: newUsername } })
})

// Authenticated route!
usersRouter.get('/change/password', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Change a user's password.
    const newUsername = 'test'
    User.updateOne({ _id: req.user._id }, { $set: { password: newUsername } })
})

usersRouter.post('/login', async (req, res) => {
    // check if the user exists
    const user = findUserByUsername(req.body.username)
    if (user == null) {
        res.status(400).json({
            success: false,
            message: 'Invalid credentials!'
        })
        return
    }

    const passwordCorrect = await user.comparePassword(req.body.username)
    if (!passwordCorrect) {
        res.status(400).json({
            success: false,
            message: 'Invalid credentials!'
        })
        return
    }

    const token = user.generateJWT()

    res.status(200).json({
        success: true,
        token
    })
})

usersRouter.post('/create', async (req, res) => {
    // To be implemented.
})

module.exports = {
    usersRouter,
    default: usersRouter
}
