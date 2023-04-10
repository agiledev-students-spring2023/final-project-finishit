/*eslint-disable*/
import express from 'express'
import sampleTasks from './tasks.mjs'
import module from 'module'

const editrouter = express.Router()

const daysAgo = days => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d
}

editrouter.post('/edittask', async (req, res) => {
    const task = req.body
    console.log(JSON.stringify(task, null, 2))

    res.send('task has been edited')
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

editrouter.put('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, duedate, remdate } = req.body;
  
      const user = await User.findByIdAndUpdate(
        id,
        { name, duedate, remdate },
        { new: true }
      );
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  })

module.exports = editrouter

export default editrouter
