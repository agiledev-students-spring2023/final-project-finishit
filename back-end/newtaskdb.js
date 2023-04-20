/*eslint-disable*/
const mongoose = require('mongoose')
const tasklist = require('./routes/tasks')
const express = require('express') // CommonJS import style!
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
        required: true,
    },
    duedate: {
        type: Date,
        unique: false,
        required: true,
    },
    remdate: {
        type: Date,
        unique: false,
        required: true,
    }
})
//preliminary, file expected to be deleted some time soon
module.exports=app
