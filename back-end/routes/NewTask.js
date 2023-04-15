const express = require('express')
const mongoose = require('mongoose')
const Schema = require('mongoose')
const { sampleTasks, setSampleTasks } = require('./tasks')

const newrouter = express.Router()
let sampleTasks1 = []
sampleTasks1 = sampleTasks1.concat(sampleTasks)

try {
    mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB.')
} catch (err) {
    console.log(
        `Error connecting to MongoDB user account authentication will fail: ${err}`
    )
}

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

newrouter.post('/newtask', async (req, res) => {
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
    const task = req.body
    console.log(JSON.stringify(task, null, 2))
    // sampleTasks.push(task)
    res.send('New task has been stored. Thank you!')
    console.log('before: ')
    console.log(sampleTasks1)
    sampleTasks1.push(JSON.stringify(task, null, 2))
    console.log('after: ')
    console.log(sampleTasks1)
})

module.exports = {
    sampleTasks,
    newrouter,
    default: newrouter
}
