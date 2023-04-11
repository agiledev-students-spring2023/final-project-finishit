/*
const express = require('express')
// const sampleTasks = require('./tasks')

const editrouter = express.Router()
const sampleTasks = require('./tasks').sampleTasks

const daysAgo = days => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d
}

let devError = false

function setError(err) {
    devError = err
}

editrouter.post('/newtask', async (req, res) => {
    const task = req.body
    console.log(JSON.stringify(task, null, 2))

    // sampleTasks.push(task)
    res.send('New task has been stored. Thank you!')
    console.log(sampleTasks)
})

editrouter.get('/tasks', async (req, res) => {
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
    editrouter,
    setError,
    default: editrouter
}
*/
