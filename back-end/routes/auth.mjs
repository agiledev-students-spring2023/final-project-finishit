const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const users = require('../data/users.json')

const authRouter = express.Router()
const config = process.env

authRouter.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = users.users.find(u => u.username === username)
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Password is incorrect' })
        }
        if (result) {
            const token = jwt.sign({ id: user.id }, config.JWT_SECRET)
            return res.json({ token })
        }
        return res.status(400).json({ message: 'Password is incorrect' })
    })
})

authRouter.post('/create', (req, res) => {
    const { username, password, petName, maidenName } = req.body
    const user = users.users.find(u => u.username === username)
    if (user) {
        return res.status(400).json({ message: 'User already exists' })
    }
    const id = users.users.length + 1
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating user' })
        }
        const newUser = {
            id,
            username,
            password: hashedPassword,
            petName,
            maidenName
        }
        users.users.push(newUser)
        res.json({ message: 'User created successfully' })
    })
})

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (!token) {
        return res.status(403).send('A token is required for authentication')
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY)
        req.user = decoded
    } catch (err) {
        return res.status(401).send('Invalid Token')
    }
    return next()
}

export default authRouter
