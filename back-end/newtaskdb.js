/*eslint-disable*/
const mongoose = require('mongoose')
const tasklist = require('./routes/tasks')
const express = require("express") // CommonJS import style!
try {
    mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB.')
} catch (err) {
    console.log(
        `Error connecting to MongoDB user account authentication will fail: ${err}`
    )
}

const newtask = new mongoose.Schema{

    name: name,
    duedate: duedate,
    remdate: remdate,
    badges: badges

}



module.exports=app;