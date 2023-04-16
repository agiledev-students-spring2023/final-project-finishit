// Represents a mongoose model of a Task.
const mongoose = require('mongoose')

// Mongoose Task schema.
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']
    },
    badges: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
})

// Create a model from this schema.
const Task = mongoose.model('Task', TaskSchema)

// Export the model.
module.exports = Task
