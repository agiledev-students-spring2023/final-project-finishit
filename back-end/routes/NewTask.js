const express = require('express')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const { sampleTasks, setSampleTasks } = require('./tasks')

const Task = require('../models/Task')

const userTask = mongoose.Schema
const newrouter = express.Router()
let sampleTasks1 = []
sampleTasks1 = sampleTasks1.concat(sampleTasks)
let devError = false

function setError(err) {
    devError = err
}

/*
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
*/

// this was newtask
// const taskIdFromForm = parseInt(req.params.id, 10)
// const taskPrevVersion = sampleTasks1.filter(item => item.id === taskIdFromForm)[0]
// const taskInCorrectFormat = {
//     id: sampleTasks.length + 1,
//     title: taskFromForm.stringname,
//     dueDate: new Date(taskFromForm.dateduedate)
// status: taskPrevVersion.status,
// badges: taskPrevVersion.badges
// }
// sampleTasks.push(task)
// Saving to the database
// let randomInt = Math.floor(Math.random() * 10000)
// let tempTask = await Task.findOne({ id: randomInt })
// while (tempTask) {
//     randomInt = Math.floor(Math.random() * 10000)
// eslint-disable-next-line no-await-in-loop
//     tempTask = await Task.findOne({ id: randomInt })
// }
// sampleTasks1.concat({ taskInCorrectFormat })
// setSampleTasks(sampleTasks.concat({
//     id: sampleTasks.length + 1,
//    title: taskFromForm.stringname,
//    dueDate: taskFromForm.dateduedate
// }))
// Until this point
/*
   console.log(JSON.stringify(task, null, 2))
    console.log('before: ')
    console.log(sampleTasks1)
    sampleTasks1.push(JSON.stringify(task, null, 2))
    console.log('after: ')
    console.log(sampleTasks1)
*/
newrouter.post('/newtask', async (req, res) => {
    // What's the use of the following lines
    const taskFromForm = req.body
    const task = req.body
    const SaveTask = new Task({
        // _id: new mongoose.Types.ObjectId(),
        // new mongoose.Types.ObjectId(), // pass something unique, not null. Look up UUID
        title: taskFromForm.stringname, // title: req.body.title
        dueDate: taskFromForm.dateduedate, // dueDate: req.body.dueDate
        status: 'COMPLETED',
        badge: ''
    })

    await SaveTask
        .save()
        .then(item => {
            res.send({
                message: 'Task added',
                item
            })
        })
        .catch(err => {
            console.error(err)
        })
})

newrouter.get('/tasks', async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }

        res.json({
            tasks: sampleTasks
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
    newrouter,
    default: newrouter
}
