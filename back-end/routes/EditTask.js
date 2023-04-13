const express = require('express')
const { sampleTasks } = require('./tasks')

const editrouter = express.Router()
let sampleTasks1 = []
sampleTasks1 = sampleTasks1.concat(sampleTasks)

const daysAgo = days => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d
}

editrouter.post('/edittask/:id', async (req, res) => {
    const task = req.body
    const taskId = parseInt(req.params.id, 10)
    console.log(task)
    console.log(sampleTasks1)
    sampleTasks1 = sampleTasks1.concat(task)

    // sampleTasks1.pop()
    console.log(JSON.stringify(task, null, 2))
    sampleTasks1 = sampleTasks1.filter(item => item.id !== taskId)
    console.log(sampleTasks1)
    res.send('task has been edited')
})

let devError = false

function setError(err) {
    devError = err
}

editrouter.get('/tasks/:id', async (req, res) => {
    try {
        res.json({
            tasks: sampleTasks
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({
            error: err,
            status: 'failed to retrieve tasks from the database'
        })
    }
})

editrouter.post('/tasks/:id', async (req, res) => {
    try {
        if (devError) {
            throw new Error('simulated error')
        }
        console.log(sampleTasks1)
        const toDel = parseInt(req.params.id, 10)
        sampleTasks1 = sampleTasks1.filter(item => item.id !== toDel)
        console.log(sampleTasks1)
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
    default: editrouter
}
