import express from 'express'

const app = express()
app.get('/', (req, res) => {
    res.send('Hello!')
})

/*
app.post('/newtask', async(req, res) => {
    name:req.body
})

app.post('/edittask', async(req, res) => {

})

export default app
*/
