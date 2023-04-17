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
        required: true
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

UserSchema.pre('save', next => {
    const user = this

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()

    // generate a salt
    bcrypt.genSalt(BCRYPT_SALT_WORK_FACTOR, (err1, salt) => {
        if (err1) return next(err1)

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err2, hash) => {
            if (err2) return next(err2)
            // override the cleartext password with the hashed one
            user.password = hash
            next()
        })
    })
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
