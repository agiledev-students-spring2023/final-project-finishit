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

// Method to create a user. Replaces the previous POST /create route.
usersRouter.post('/create', async (req, res) => {
    // TODO: (Khalifa) Create a user in the database.
    // Note the user should NOT be logged in automatically after creation.
    // After the user has been created, send them to the login page.
})

// Method to login a user. Replaces the previous POST /login route.
usersRouter.post('/login', async (req, res) => {
    try {
        // Check if the user exists, if not throw an error.
        const user = await findUserByUsername(req.body.username)
        if (user == null) throw Error()

        // Check if the user's password is correct, if not throw an error.
        const passwordCorrect = await user.comparePassword(req.body.password)
        if (!passwordCorrect) throw Error()

        // Everything looks good, send the user a success message and their token.
        const token = user.generateJWT()
        res.status(200).json({ success: true, token })
    } catch {
        res.status(400).json({
            success: false,
            message: 'Invalid credentials!'
        })
    }
})

// Authenticated route!
usersRouter.get('/userInfo', passport.authenticate('jwt', { session: false }), (req, res) => {
    // For now, this route returns ALL the user information.
    // This is insecure, but will change in the future.
    // For now, this will allow the frontend to work without changes.
    res.json(req.user)
})

// Authenticated route! Will replace the previous PUT / route.
usersRouter.post('/change/username', passport.authenticate('jwt', { session: false }), (req, res) => {
    // TODO: (Harrison) Change a user's username.
    const newUsername = 'test'
    User.updateOne({ _id: req.user._id }, { $set: { username: newUsername } })
})

// Authenticated route! Will replace the previous PATCH /reset-password route.
usersRouter.post('/change/password', passport.authenticate('jwt', { session: false }), (req, res) => {
    // TODO: (Harrison) Change a user's password.
    const newPassword = 'test'
    User.updateOne({ _id: req.user._id }, { $set: { password: newPassword } })
})

// Authenticated route! Will allow a user to delete their account.
usersRouter.post('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
    // TODO: (Khalifa) Delete user account in database.
})

module.exports = {
    usersRouter,
    default: usersRouter
}
