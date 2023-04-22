// Represents a mongoose model of a Badge.
const mongoose = require('mongoose')

// Mongoose Badge schema.
const BadgeSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    color: {
        type: String,
        validate: /^#[0-9a-f]{6}$/,
        default: '#000000'
    }
})

// Create a model from this schema.
const Badge = mongoose.model('Badge', BadgeSchema)

// Export the model.
module.exports = Badge
