const express = require('express')
const mongoose = require('mongoose')
const { sampleTasks, setSampleTasks } = require('./tasks')
const Task = require('../models/Task')
const User = require('../models/User')

const userTask = mongoose.Schema

const editrouter = express.Router()
let sampleTasks1 = []
sampleTasks1 = sampleTasks1.concat(sampleTasks)

let devError = false

function setError(err) {
    devError = err
}

editrouter.post('/edittask', async (req, res) => {
    const taskFromForm = req.body
    const taskIdFromForm = parseInt(req.params.id, 10)

    const taskPrevVersion = sampleTasks1.filter(item => item.id === taskIdFromForm)[0]

    const taskInCorrectFormat = {
        id: taskIdFromForm,
        title: taskFromForm.stringname,
        dueDate: new Date(taskFromForm.dateduedate),
        status: taskPrevVersion.status,
        badges: taskPrevVersion.badges
    }

    sampleTasks1 = sampleTasks1.filter(item => item.id !== taskIdFromForm)
    sampleTasks1 = sampleTasks1.concat(taskInCorrectFormat)
    setSampleTasks(sampleTasks1)
    res.send('task has been edited')
    Task.findById({ _id: req.body.id })
    Task.updateOne({ id: taskIdFromForm,
        title: req.body.stringname,
        dueDate: req.body.dateduedate })
    User.task.updateOne({ id: taskIdFromForm,
        title: req.body.stringname,
        dueDate: req.body.dateduedate })
})

editrouter.post('/tasks/:id', async (req, res) => {
    const taskFromForm = req.body
    const taskIdFromForm = parseInt(req.params.id, 10)

    const taskPrevVersion = sampleTasks1.filter(item => item.id === taskIdFromForm)[0]
    const taskInCorrectFormat = {
        id: taskIdFromForm,
        title: taskFromForm.stringname,
        dueDate: new Date(taskFromForm.dateduedate)
        // status: taskPrevVersion.status,
        // badges: taskPrevVersion.badges
    }
    // Deletion code attempt
    try {
        const result = await Task.findByIdAndDelete({ _id: Task._id })
        if (result) {
            res.status(200).json({
                success: true
            })
        }
        if (devError) {
            throw new Error('simulated error')
        }

        // here is my code for trying to delete
        Task.deleteOne({ _id: Task._id })
        res.json({
            deleteSuccess: true
        })
        User.findByIdAndDelete({ _id: Task._id })
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'failed to delete'
        })
    }
})
// get the tasks
editrouter.get('/tasks', async (req, res) => {
    const tasks = await Task.find().select('_id')

    res.status(200).json({
        success: true,
        tasks
    })
})

module.exports = {
    sampleTasks,
    editrouter,
    setError,
    default: editrouter
}
