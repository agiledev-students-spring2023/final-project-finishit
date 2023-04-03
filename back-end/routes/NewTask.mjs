const express = require('express')
const cors = require('cors')

const port = 5000
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/', (req, res) => {
    const { email, password } = req.body
    console.log(`Your Email is ${email} and your password is ${password}`)
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
