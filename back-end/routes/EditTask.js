const express = require('express')
const mongoose = require('mongoose')
const Schema = require('mongoose')
const { sampleTasks, setSampleTasks } = require('./tasks')

const editrouter = express.Router()
let sampleTasks1 = []
sampleTasks1 = sampleTasks1.concat(sampleTasks)

let devError = false

const taskSchema = new Schema({
    task: {
        type: String,
        unique: false,
        required: true
    },
    duedate: {
        type: Date,
        unique: false,
        required: true
    },
    remdate: {
        type: Date,
        unique: false,
        required: true
    }
})

const Newtask = mongoose.model('task', taskSchema)

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
    const mytask = Newtask(req.body)
    mytask.save()
        .then(item => { res.send('item saved to database') })
        .catch(err => {
            res.status(400).send('unable to save to database')
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
})

module.exports = {
    sampleTasks,
    editrouter,
    setError,
    default: editrouter
}
