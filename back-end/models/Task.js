// Represents a mongoose model of a Task.
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
// Mongoose Task schema.
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: false,
        required: true
    },
    dueDate: {
        type: Date,
        unique: false,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']
    },
    badges: {
        type: [String],
        default: []
    }
})

// Create a model from this schema.
const Task = mongoose.model('Task', TaskSchema)

// Export the model.
module.exports = Task
