const express = require('express')
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken')
const { promises } = require('fs')

const fs = promises
const { fileURLToPath, pathToFileURL } = require('url')
const { path, dirname } = require('path')

const usersRouter = express.Router()
// eslint-disable-next-line no-underscore-dangle
const filename = fileURLToPath(pathToFileURL(__filename).toString())
// eslint-disable-next-line no-underscore-dangle
const dirName = dirname(filename)

usersRouter.post('/login', async (req, res) => {
    // check if the user exists

    const filePath = path.join(dirName, '../data/users.json')

    const usersInJSON = await fs.readFile(filePath, 'utf-8')

    const users = JSON.parse(usersInJSON)
    const found = users.find(user => user.username === req.body.username)
    console.log(found)
    if (!users.find(user => user.username === req.body.username)) {
        res.status(400).json({
            success: false,
            message: 'Invalid credentials!'
        })
        return
    }

    // check of username and password both
    const foundUser = users.find(user => user.username === req.body.username)
    if (foundUser.password === req.body.password) {
        // generate token
        const token = jwt.sign(
            { username: foundUser.username },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRE
            }
        )

        res.status(200).json({
            success: true,
            token
        })
    }
})

usersRouter.post('/create', async (req, res) => {
    const filePath = path.join(__dirname, '../data/users.json')

    const usersInJSON = await fs.readFile(filePath, 'utf-8')

    const users = JSON.parse(usersInJSON)

    const userExists = users.find(user => user.username === req.body.username)

    if (userExists) {
        res.status(400).json({
            success: false,
            message: 'Username already exists'
        })
        return
    }

    const newUsersList = [...users, req.body]

    const response1 = await fs.writeFile(filePath, JSON.stringify(newUsersList))

    // check of username and password both
    res.status(200).json({
        success: true,
        message: 'account created successfully'
    })
})

module.exports = {
    usersRouter,
    default: usersRouter
}
