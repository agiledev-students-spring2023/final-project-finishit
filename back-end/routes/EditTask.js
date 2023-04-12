const express = require('express')
const { sampleTasks } = require('./tasks')

const editrouter = express.Router()

const daysAgo = days => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d
}

editrouter.post('/edittask/:id', async (req, res) => {
    const task = req.body
    console.log(task)
    let sampleTasks1 = []
    sampleTasks1 = sampleTasks1.concat(sampleTasks)
    sampleTasks1 = sampleTasks1.concat(task)
    sampleTasks1.splice(sampleTasks1.findIndex(':id'), 1)
    // sampleTasks1.pop()
    console.log(JSON.stringify(task, null, 2))
    console.log(sampleTasks1)
    res.send('task has been edited')
})

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

module.exports = {
    sampleTasks,
    editrouter,
    default: editrouter
}
