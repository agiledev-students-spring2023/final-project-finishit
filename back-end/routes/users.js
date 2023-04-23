// NPM imports.
const express = require('express')
const passport = require('passport')

// Model imports.
const User = require('../models/User')

const usersRouter = express.Router()

// Returns the user if found, otherwise returns null.
// (Error checking should be done by whichever function calls this.)
const findUserByUsername = async username => {
    let user = await User.findOne({ username }).select('+password')
    if (!user) user = null
    return user
}

// Method to create a user. Replaces the previous POST /create route.
usersRouter.post('/create', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            petName: req.body.petName,
            motherName: req.body.motherName,
            tasks: [],
            badges: []
        })
        if (newUser) {
            res.status(200).json({
                success: true,
                message: 'User created successfully',
                users: newUser
            })
        } else {
            res.status(403).json({
                success: false,
                message: 'User not created successfully',
                user: null
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
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
    const newUsername = req.body.newUsername
    User.updateOne({ _id: req.user._id }, { $set: { username: newUsername } }).then(() => {
        res.json({ success: true })
    }).catch(error => {
        res.json({ error })
    })
})

// Authenticated route! Will replace the previous PATCH /reset-password route.
usersRouter.post('/change/password', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // Use a different method to change password so it is hashed.
    try {
        const newPassword = req.body.newPassword
        const user = await User.findById(req.user._id)
        user.password = newPassword
        await user.save()
        res.json({ success: true })
    } catch {
        res.json({ success: false })
    }
})

// Authenticated route! Will allow a user to delete their account.
usersRouter.post('/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.user.id)
        if (result) {
            res.status(200).json({
                success: true
            })
        }
    } catch (err) {
        res.status(200).json({
            success: false
        })
    }
})

usersRouter.get('/users', async (req, res) => {
    const users = await User.find().select('password')

    res.status(200).json({
        success: true,
        users
    })
})

module.exports = {
    usersRouter,
    default: usersRouter
}
