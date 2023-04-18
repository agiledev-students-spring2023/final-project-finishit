// Disable func-names so functions remain in scope.
/* eslint-disable func-names */
// Represents a mongoose model of a User.
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// Import other models.
const Badge = require('./Badge')
const Task = require('./Task')

dotenv.config({ silent: true })

// Mongoose User schema.
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    petName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    tasks: {
        type: [Task.schema],
        default: []
    },
    badges: {
        type: [Badge.schema],
        default: []
    }
})

// Salt and hash a password before saving it in the database.
const BCRYPT_SALT_WORK_FACTOR = 10

UserSchema.pre('save', async next => {
    // If a user has modified their password, hash it.
    if (!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(BCRYPT_SALT_WORK_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
})

// Compare a submitted password against the user's stored password.
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const validPassword = await bcrypt.compare(candidatePassword, this.password)
    return validPassword
}

// Return a JWT token for the user.
UserSchema.methods.generateJWT = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    )
}

// Return the user information without sensitive data.
UserSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        token: this.generateJWT()
    }
}

UserSchema.methods.verifyQuestions = function (answers) {
    return (
        this.petName === answers.petName
        && this.motherName === answers.motherName
    )
}

// Create a model from this schema.
const User = mongoose.model('User', UserSchema)

// Export the model.
module.exports = User
