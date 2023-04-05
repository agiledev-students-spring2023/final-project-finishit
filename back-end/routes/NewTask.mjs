import express from 'express'
// import tasksRouter from './tasks.mjs'

const newrouter = express.Router()

const daysAgo = days => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d
}

const sampleTasks = [
    { id: 1, title: 'Finish essay', status: 'NOT_STARTED', badges: [{ id: 1, color: '#ff5733', text: 'School' }, { id: 2, color: '#4f2f4f', text: 'Writing' }] },
    { id: 2, title: 'Buy groceries', status: 'IN_PROGRESS', badges: [{ id: 3, color: '#00bfff', text: 'Shopping' }] }

]

newrouter.post('/newtask', async (req, res) => {
    const task = req.body
    console.log(JSON.stringify(task, null, 2))

    // sampleTasks.push(task)
    res.send('New task has been stored. Thank you!')
    console.log(sampleTasks)
})

newrouter.get('/tasks', async (req, res) => {
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

export default newrouter
