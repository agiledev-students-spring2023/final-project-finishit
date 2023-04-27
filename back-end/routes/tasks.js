/*eslint-disable*/
/**
 * These are the routes for the /tasks page on the front-end.
 */
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const sanitize = require('mongo-sanitize')
const { body, validationResult } = require('express-validator')

const User = require('../models/User')
const Badge = require('../models/Badge')

const tasksRouter = express.Router()

const daysAgo = days => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d
}

let sampleTasks = [
    { id: 1, title: 'Finish essay', dueDate: daysAgo(-2), status: 'NOT_STARTED', badges: [{ id: 1, color: '#ff5733', text: 'School' }, { id: 2, color: '#4f2f4f', text: 'Writing' }] },
    { id: 2, title: 'Buy groceries', dueDate: daysAgo(2), status: 'IN_PROGRESS', badges: [{ id: 3, color: '#00bfff', text: 'Shopping' }] },
    { id: 3, title: 'Clean bathroom', dueDate: daysAgo(7), status: 'COMPLETED', badges: [{ id: 4, color: '#008000', text: 'Cleaning' }, { id: 9, color: '#8b4513', text: 'Home' }] },
    { id: 4, title: 'Call grandma', dueDate: daysAgo(3), status: 'NOT_STARTED', badges: [{ id: 5, color: '#ffd700', text: 'Family' }] },
    { id: 5, title: 'Attend meeting', dueDate: daysAgo(1), status: 'IN_PROGRESS', badges: [{ id: 6, color: '#ffa500', text: 'Work' }, { color: '#ff69b4', text: 'Meeting' }] },
    { id: 6, title: 'Go for a run', dueDate: daysAgo(4), status: 'COMPLETED', badges: [{ id: 7, color: '#ff1493', text: 'Exercise' }] },
    { id: 7, title: 'Pay rent', dueDate: daysAgo(10), status: 'NOT_STARTED', badges: [{ id: 8, color: '#ff0000', text: 'Bills' }, { id: 9, color: '#8b4513', text: 'Home' }] },
    { id: 8, title: 'Read book', dueDate: daysAgo(6), status: 'IN_PROGRESS', badges: [{ id: 10, color: '#9400d3', text: 'Leisure' }, { color: '#4169e1', text: 'Reading' }] },
    { id: 9, title: 'Take out trash', dueDate: daysAgo(2), status: 'COMPLETED', badges: [{ id: 4, color: '#008000', text: 'Cleaning' }, { id: 9, color: '#8b4513', text: 'Home' }] },
    { id: 10, title: 'Finish project', dueDate: daysAgo(8), status: 'NOT_STARTED', badges: [{ id: 6, color: '#ffa500', text: 'Work' }, { id: 1, color: '#ff5733', text: 'School' }] }
]

let devError = false

function setError(err) {
    devError = err
}

function setSampleTasks(newSampleTasks) {
    sampleTasks = newSampleTasks
}

// Authenticated route. Gives user a list of their tasks from the database.
tasksRouter.get('/tasks', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const toRet = req.user.tasks.toObject()
    for(let i=0; i<toRet.length; i++){
        for(let j=0; j<toRet[i].badges.length; j++){
            toRet[i].badges[j] = req.user.badges.find(ele => 
                ele._id.toString() === req.user.tasks[i].badges[j]
                )
        }
    }

    res.json(toRet)
})

// Authenticated route. Creates a new task under the logged-in user.
tasksRouter.post('/newtask', [passport.authenticate('jwt', { session: false }),
body('stringname', 'Please specify a valid name for your task').not().isEmpty()?.escape(),
body('dateduedate', 'Please select a valid duedate').not().isEmpty()?.escape()
, body('status1', 'Please select a valid duedate').not().isEmpty()?.escape()], 
async (req, res) => {

    try{
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

        console.log(req.body.badges)

        const taskInCorrectFormat = {
            title: sanitize(taskFromForm.stringname),
            dueDate: new Date(taskFromForm.dateduedate),
            status: sanitize(taskFromForm.status1),
        //    badges: req.body.badges.map(val => val._id)
        }

        // Add task to user object using method from User model.
        user.addTask(taskInCorrectFormat)

        // Send back a response.
        res.send('New task has been stored. Thank you!')

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: 'Could not add new badge. Please try again later.'
        })
    }

    
})

// Authenticated route. Edits an existing task under the logged-in user.
tasksRouter.post('/tasks/:id', [passport.authenticate('jwt', { session: false }),
body('stringname', 'Please specify a valid name for your task').not().isEmpty()?.escape(),
body('dateduedate', 'Please specify a valid date for your task').not().isEmpty()?.escape(),
body('status1', 'Please select a valid duedate').not().isEmpty()?.escape()
], async (req, res) => {
    try{
        if (devError) {
            throw new Error('simulated error')
        }
        const valErrors = validationResult(req).array().map(val => val.msg)
        if (valErrors.length) {
            res.json({ status: valErrors })
            return
        }
        const user = await User.findById(req.user._id)
        const taskIndex = user.tasks.findIndex(task => task._id.toString() === sanitize(req.params.id).toString())

        // Throw an error if the task was not found.
        if (taskIndex === -1) {
            res.status(500).json({
                error: err,
                status: 'failed to edit'
            })
            return ''
        }
        if (!taskIndex) {
            res.json({ invalidID: true })
            return
        }

        // Otherwise set task data at the found index in the user's tasks.
        const taskFromForm = req.body
        const taskPrevVersion = user.tasks[taskIndex]

        const taskInCorrectFormat = {
            _id: taskPrevVersion._id,
            title: sanitize(taskFromForm.stringname),
            dueDate: new Date(taskFromForm.dateduedate),
            status: sanitize(taskFromForm.status1),
            badges: taskFromForm.badges
        }

        user.tasks[taskIndex] = taskInCorrectFormat
        await user.save()

    res.send('task has been edited')
    res.json({ changedSuccess: true })
    } catch (err){
        console.log(err)
        res.status(500).json({
            error: err,
            status: 'Could not edit specified badge. Please try again later.'
        })
    }
})

//for editing getting a task
tasksRouter.get('/tasks/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {

    try {
        if (devError) {
            throw new Error('simulated error')
        }
        const toRet = req.user.tasks.toObject().find(ele => ele._id.toString() === sanitize(req.params.id))
        //get badges in proper object format
        for(let j=0; j<toRet.badges.length; j++){
            toRet.badges[j] = req.user.badges.find(ele =>
                ele._id.toString() === toRet.badges[j]
            )
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
        console.log(err)
    }

})

// Authenticated route. Deletes an existing task under the logged-in user.
tasksRouter.post('/deletetask/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try{
        if (devError) {
            throw new Error('simulated error')
        }

        const user = await User.findById(req.user._id)
        const taskIndex = user.tasks.findIndex(task => task._id.toString() === sanitize(req.params.id).toString())

        // Throw an error if the task was not found.
        if (taskIndex === -1) {
            res.status(500).json({
                error: err,
                status: 'failed to delete'
            })
            return ''
        }
        if (!taskIndex) {
            res.json({ invalidID: true })
            return
        }

        // Otherwise delete the task and return a success.
        user.tasks.splice(taskIndex, 1)
        await user.save()
    res.json({ deleteSuccess: true })
    } catch (err){
        res.status(500).json({
            error: err,
            status: 'Could not delete specified badge. Please try again later.'
        })
    }
})

module.exports = {
    tasksRouter,
    setError,
    setSampleTasks,
    default: tasksRouter
}
