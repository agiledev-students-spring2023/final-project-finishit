/**
 * These are the routes for the /tasks page on the front-end.
 */
const express = require('express')
const passport = require('passport')
const sanitize = require('mongo-sanitize')
const { body, validationResult } = require('express-validator')

const User = require('../models/User')

const tasksRouter = express.Router()

let devError = false

function setError(err) {
    devError = err
}

// Authenticated route. Gives user a list of their tasks from the database.
tasksRouter.get('/tasks', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }

        const toRet = req.user.tasks.toObject()
        for (let i = 0; i < toRet.length; i += 1) {
            for (let j = 0; j < toRet[i].badges.length; j += 1) {
                toRet[i].badges[j] = req.user.badges
                    .find(ele => ele._id.toString() === req.user.tasks[i].badges[j])
            }
        }

        res.json(toRet)
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'Could not retrieve badges. Please try again later.'
        })
    }
})

// Authenticated route. Creates a new task under the logged-in user.
tasksRouter.post('/newtask', [passport.authenticate('jwt', { session: false }),
    body('stringname', 'Please specify a valid name for your task').not().isEmpty()?.escape(),
    body('dateduedate', 'Please select a valid date').not().isEmpty()?.escape(),
    body('status1', 'Please select a valid status').not().isEmpty()?.escape()], async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }

        const valErrors = validationResult(req).array().map(val => val.msg)
        if (valErrors.length) {
            res.json({ status: valErrors })
            return
        }

        const user = await User.findById(req.user._id)
        const taskFromForm = req.body

        const taskInCorrectFormat = {
            title: sanitize(taskFromForm.stringname),
            dueDate: new Date(taskFromForm.dateduedate),
            status: sanitize(taskFromForm.status1),
            badges: req.body.badges.map(val => val._id)
        }

        // Add task to user object using method from User model.
        user.addTask(taskInCorrectFormat)

        // Send back a response.
        res.json({
            addSuccess: true
        })
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'Could not add new task. Please try again later.'
        })
    }
})

// Authenticated route. Edits an existing task under the logged-in user.
tasksRouter.post(
    '/tasks/:id',
    [
        passport.authenticate('jwt', { session: false }),
        body('stringname', 'Please specify a valid name for your task').not().isEmpty()?.escape(),
        body('dateduedate', 'Please select a valid due date').not().isEmpty()?.escape(),
        body('status1', 'Please select a valid status').not().isEmpty()?.escape()
    ],
    async (req, res) => {
        try {
            if (devError) {
                throw new Error('simulated error')
            }
            const valErrors = validationResult(req).array().map(val => val.msg)
            if (valErrors.length) {
                res.json({ status: valErrors })
                return
            }

            const user = await User.findById(req.user._id)
            const taskIndex = user.tasks
                .findIndex(task => task._id.toString() === sanitize(req.params.id).toString())

            // Throw an error if the task was not found.
            if (taskIndex === -1) {
                res.status(500).json({
                    error: 'Unable to find specified task.',
                    status: 'Failed to edit.'
                })
                return ''
            }

            // Otherwise set task data at the found index in the user's tasks.
            const taskFromForm = req.body
            const taskPrevVersion = user.tasks[taskIndex]

            const taskInCorrectFormat = {
                _id: taskPrevVersion._id,
                title: sanitize(taskFromForm.stringname),
                dueDate: new Date(taskFromForm.dateduedate),
                status: sanitize(taskFromForm.status1),
                badges: sanitize(taskFromForm.badges)
            }

            user.tasks[taskIndex] = taskInCorrectFormat
            await user.save()

            res.json({
                changedSuccess: true
            })
        } catch (err) {
            res.status(500).json({
                error: err,
                status: 'Could not edit specified task. Please try again later.'
            })
        }
    }
)

// For editing getting a task.
tasksRouter.get('/tasks/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        const toRet = req.user.tasks.toObject()
            .find(ele => ele._id.toString() === sanitize(req.params.id))

        if (!toRet) {
            res.json({ invalidID: true })
            return
        }

        // Get badges in proper object format.
        for (let j = 0; j < toRet.badges.length; j += 1) {
            toRet.badges[j] = req.user.badges.find(ele => ele._id.toString() === toRet.badges[j])
        }

        res.json({
            task: toRet,
            allBadges: req.user.badges
        })
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'Could not retrieve specified task. Please try again later.'
        })
    }
})

// Authenticated route. Easy method to update a task's status given its current status.
tasksRouter.post('/updatetaskstatus/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const taskIndex = user.tasks.findIndex(
            task => task._id.toString() === sanitize(req.params.id).toString()
        )

        // Throw an error if the task was not found.
        if (taskIndex === -1) {
            res.status(500).json({
                error: 'Unable to find specified task.',
                status: 'Failed to update task.'
            })
            return
        }

        // Otherwise update the task's status and return a success.
        const task = user.tasks[taskIndex]
        let newStatus = task.status
        switch (task.status) {
        case 'NOT_STARTED':
            newStatus = 'IN_PROGRESS'
            break
        case 'IN_PROGRESS':
            newStatus = 'COMPLETED'
            break
        default:
            break
        }
        // Update task and save to database.
        task.status = newStatus
        user.tasks[taskIndex] = task
        await user.save()
        res.json({
            changedSuccess: true
        })
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'Could not update specified task. Please try again later.'
        })
    }
})

// Authenticated route. Deletes an existing task under the logged-in user.
tasksRouter.post('/deletetask/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const taskIndex = user.tasks.findIndex(
            task => task._id.toString() === sanitize(req.params.id).toString()
        )
        if (!taskIndex) {
            res.json({ invalidID: true })
            return
        }

        // Throw an error if the task was not found.
        if (taskIndex === -1) {
            res.status(500).json({
                error: 'Unable to find specified task.',
                status: 'failed to delete'
            })
            return
        }

        // Otherwise delete the task and return a success.
        user.tasks.splice(taskIndex, 1)
        await user.save()
        res.json({ deleteSuccess: true })
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'Could not delete specified task. Please try again later.'
        })
    }
})

module.exports = {
    tasksRouter,
    setError,
    default: tasksRouter
}
