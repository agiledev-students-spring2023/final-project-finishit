const express = require('express')
const mongoose = require('mongoose')
const { sampleTasks, setSampleTasks } = require('./tasks')
const Task = require('../models/Task')

const userTask = mongoose.Schema

const editrouter = express.Router()
let sampleTasks1 = []
sampleTasks1 = sampleTasks1.concat(sampleTasks)

let devError = false

function setError(err) {
    devError = err
}

editrouter.post('/edittask/:id', async (req, res) => {
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
    Task.findOne({ id: taskIdFromForm }, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            result.title = taskFromForm.stringname
            result.dueDate = taskFromForm.dueDate
        }
    })
})

editrouter.post('/tasks/:id', async (req, res) => {
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
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        const toDel = parseInt(req.params.id, 10)
        sampleTasks1 = sampleTasks1.filter(item => item.id !== toDel)
        setSampleTasks(sampleTasks1)
        res.json({
            deleteSuccess: true
        })
    } catch (err) {
        res.status(500).json({
            error: err,
            status: 'failed to delete'
        })
    }
    Task.deleteOne({ id: taskIdFromForm })
})

module.exports = {
    sampleTasks,
    editrouter,
    setError,
    default: editrouter
}
