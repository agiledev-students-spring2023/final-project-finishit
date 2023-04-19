/*eslint-disable*/
/**
 * These are the routes for the /tasks page on the front-end.
 */
const express = require('express')
const mongoose = require('mongoose')

const Task = require('../models/Task')

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

/*
async function upload(req, res) {
    for ( let i = 0; i<sampleTasks.length; i +=1){

        try{
            const newTask = await Task.create({title: sampleTasks[i].title, dueDate: sampleTasks[i].dueDate })
            if (newTask) {
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

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

    }
    upload()
}
*/


let devError = false

function setError(err) {
    devError = err
}

function setSampleTasks(newSampleTasks) {
    sampleTasks = newSampleTasks
}

tasksRouter.get('/tasks', async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        console.log("Fetching results")
        // Fetch from the db
        let tasks = await Task.find({});

        res.json({
            tasks: tasks
        })
        /*      
        res.json({
            tasks: sampleTasks
        })
        */
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: 'failed to retrieve tasks from the database'
        })
    }
})

// make a single route for one task
tasksRouter.get('/tasks/:id', async (req, res) => {
    const task = req.body
    try {
        if (devError) {
            throw new Error('simulated error')
        }

        res.json({
            tasks: sampleTasks.filter(item => item.id === parseInt(req.params.id, 10))
        })
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'failed to retrieve tasks from the database'
        })
    }
})

module.exports = {
    sampleTasks,
    tasksRouter,
    setError,
    setSampleTasks,
    default: tasksRouter
}
