const express = require('express')
const { sampleTasks } = require('./tasks')

const newrouter = express.Router()

newrouter.post('/newtask', async (req, res) => {
    const task = req.body
    console.log(JSON.stringify(task, null, 2))
    let sampleTasks1 = []
    sampleTasks1 = sampleTasks1.concat(sampleTasks)
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
