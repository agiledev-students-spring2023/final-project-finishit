// NPM imports.
const express = require('express')
const passport = require('passport')
const { body, validationResult } = require('express-validator')
const sanitize = require('mongo-sanitize')

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
usersRouter.post('/create', [
    body('username').notEmpty().withMessage('Username is required').trim()
        .isLength({ min: 4, max: 12 })
        .withMessage('Username must be between 4 to 12 characters')
        .escape(),
    body('password').notEmpty().withMessage('Password is required')
        .isLength({ min: 6, max: 12 })
        .withMessage('Password must be between 4 to 12 characters')
        .escape(),
    body('petName').notEmpty().withMessage('Pet name is required').trim()
        .escape(),
    body('motherName').notEmpty().withMessage('Mother name is required').trim()
        .escape()
], async (req, res) => {
    try {
        const valErrors = validationResult(req).array().map(val => val.msg)
        if (valErrors.length) {
            res.json({ status: valErrors })
            return
        }
        const newUser = await User.create({
            username: sanitize(req.body.username),
            password: sanitize(req.body.password),
            petName: sanitize(req.body.petName),
            motherName: sanitize(req.body.motherName),
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
usersRouter.post('/login', [
    body('username').notEmpty().withMessage('Username is required').trim()
        .escape(),
    body('password').notEmpty().withMessage('Password is required').escape()
], async (req, res) => {
    try {
        const valErrors = validationResult(req).array().map(val => val.msg)
        if (valErrors.length) {
            res.json({ status: valErrors })
            return
        }
        // Check if the user exists, if not throw an error.
        const user = await findUserByUsername(sanitize(req.body.username))
        if (user == null) throw Error()

        // Check if the user's password is correct, if not throw an error.
        const passwordCorrect = await user.comparePassword(sanitize(req.body.password))
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

usersRouter.post('/forgot', [
    body('username').notEmpty().withMessage('Username is required').trim()
        .escape(),
    body('petName').notEmpty().withMessage('Pet name is required').trim()
        .escape(),
    body('motherName').notEmpty().withMessage('Mother name is required').trim()
        .escape(),
    body('newPassword').notEmpty().withMessage('New password is required')
        .escape()
], async (req, res) => {
    try {
        const valErrors = validationResult(req).array().map(val => val.msg)
        if (valErrors.length) {
            res.json({ status: valErrors })
            return
        }
        // Check if the user exists, if not throw an error.
        const user = await findUserByUsername(sanitize(req.body.username))
        if (user == null) throw Error()

        // Check if the user's security questions are correct.
        const questionsCorrect = await user.compareQuestions({
            petName: sanitize(req.body.petName),
            motherName: sanitize(req.body.motherName)
        })
        if (!questionsCorrect) throw Error()

        // If user security questions are correct, change the password.
        user.password = sanitize(req.body.newPassword)
        await user.save()
        res.status(200).json({ success: true })
    } catch {
        res.status(400).json({
            success: false,
            message: 'Unable to change password. Are your security questions right?'
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
usersRouter.post('/change/username', passport.authenticate('jwt', { session: false }), [
    body('newUsername').notEmpty().withMessage('New Username is required').trim()
        .isLength({ min: 4, max: 12 })
        .withMessage('Username must be between 4 to 12 characters')
        .escape()
], (req, res) => {
    const valErrors = validationResult(req).array().map(val => val.msg)
    if (valErrors.length) {
        res.json({ status: valErrors })
        return
    }
    const newUsername = sanitize(req.body.newUsername)
    User.updateOne({ _id: req.user._id }, { $set: { username: newUsername } }).then(() => {
        res.status(200).json({ success: true })
    }).catch(error => {
        res.status(400).json({ error })
    })
})

// Authenticated route! Will replace the previous PATCH /reset-password route.
usersRouter.post('/change/password', passport.authenticate('jwt', { session: false }), [
    body('newPassword').notEmpty().withMessage('New password is required').trim()
        .isLength({ min: 6, max: 12 })
        .withMessage('Password must be between 4 to 12 characters')
        .escape()
], async (req, res) => {
    // Use a different method to change password so it is hashed.
    try {
        const valErrors = validationResult(req).array().map(val => val.msg)
        if (valErrors.length) {
            res.json({ status: valErrors })
            return
        }
        const user = await User.findById(req.user._id)
        user.password = sanitize(req.body.newPassword)
        await user.save()
        res.status(200).json({ success: true })
    } catch {
        res.status(400).json({ success: false })
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
