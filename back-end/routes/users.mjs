import express from 'express'
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken'
import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const usersRouter = express.Router()

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url)
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename)

async function findUserAndList(username) {
    const filePath = path.join(__dirname, '../data/users.json')
    const usersInJSON = await fs.readFile(filePath, 'utf-8')
    const users = JSON.parse(usersInJSON)
    let foundUser = null
    foundUser = users.find(user => user.username === username)
    return {
        user: foundUser,
        users
    }
}

// filterd payload

const filterPayload = payload => {
    const dataArray = Object.entries(payload)
    // console.log(dataArray);
    return Object.fromEntries(dataArray.filter(([key, value]) => value !== ''))
}

const saveUsers = async users => {
    const filePath = path.join(__dirname, '../data/users.json')
    const response1 = await fs.writeFile(filePath, JSON.stringify(users))
    return true
}

const getUsers = async () => {
    const filePath = path.join(__dirname, '../data/users.json')
    const usersInJSON = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(usersInJSON)
}

const verifyQuestions = async (username, answers) => {
    const users = await getUsers()
    let verified = false
    try {
        users.forEach(user => {
            if (
                user.petName === answers.petName
                && user.motherName === answers.motherName
                && user.username === username
            ) {
                verified = true
                throw new Error('verified')
            }
        })
    } catch (e) {
        if (e.message !== 'verified') {
            throw e
        }
    }
    return verified
}

const findUserByUsername = async username => {
    const users = await getUsers()
    return users.find(user => user.username === username)
}

usersRouter.post('/login', async (req, res) => {
    // check if the user exists

    const filePath = path.join(__dirname, '../data/users.json')

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
            token,
            user: foundUser
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

usersRouter.put('/', async (req, res) => {
    let token = null
    let updatedUser = null

    // check if the request has token and it's proper defined
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        res.status(403).json({
            success: false,
            message: 'Unauthorized!'
        })
    }

    // decoding token here

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const loggedInUserName = decoded.username
        console.log(loggedInUserName)
        if (loggedInUserName !== '') {
            // do the next stuff
            const result = await findUserAndList(loggedInUserName)
            if (result.user) {
                // do the next stuff
                const modifiedUsers = result.users.map(user => {
                    if (user.username === loggedInUserName) {
                        // get only those keys which has values
                        const filteredPayload = filterPayload(req.body)
                        // eslint-disable-next-line no-param-reassign
                        user = { ...user, ...filteredPayload }
                    }
                    return user
                })

                updatedUser = modifiedUsers.find(
                    user => user.username === loggedInUserName
                )
                // write filte function
                const response = await saveUsers(modifiedUsers)
                res.status(200).json({
                    success: true,
                    user: updatedUser
                })
            }
        } else {
            res.status(403).json({
                success: false,
                message: 'Unauthorized!'
            })
        }
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err.message
        })
    }

    // check if user is loggd in
})

usersRouter.post('/verify-answers', async (req, res) => {
    const { username, answers } = req.body
    const found = await findUserByUsername(username)
    if (!found) {
        res.status(404).json({
            success: false,
            message: 'username not found!'
        })
        return
    }

    const verified = await verifyQuestions(username, answers)
    if (!verified) {
        res.status(403).json({
            success: false,
            message: 'You have answered wrong!'
        })
    } else {
        res.status(200).json({
            success: true,
            message: 'verified!',
            username
        })
    }
})

usersRouter.patch('/reset-password', async (req, res) => {
    const { username, newPassword } = req.body
    const found = await findUserByUsername(username)

    if (!found) {
        res.status(404).json({
            success: false,
            message: 'username not found!'
        })
        return
    }

    // reset Password

    const users = await getUsers()
    users.map(user => {
        if (user.username === username) {
            user.password = newPassword
        }
        return user
    })

    const response = await saveUsers(users)
    if (!response) {
        res.status(400).json({
            success: false,
            message: 'Password reset failed'
        })
    } else {
        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        })
    }
})

export default usersRouter
