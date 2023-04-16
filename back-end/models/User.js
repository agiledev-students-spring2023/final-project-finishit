// Represents a mongoose model of a User.
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Import other models.
const Badge = require('./Badge')
const Task = require('./Task')

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
UserSchema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

// Return a JWT token for the user.
UserSchema.methods.generateJWT = () => {
    const today = new Date()
    const exp = new Date(today)
    exp.setDate(today.getDate() + process.env.JWT_EXPIRE) // .env var for token expiration

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000, 10)
    }, process.env.JWT_SECRET)
}

// Return the user information without sensitive data.
UserSchema.methods.toAuthJSON = () => ({
    username: this.username,
    token: this.generateJWT()
})

// Create a model from this schema.
const User = mongoose.model('User', UserSchema)

// Export the model.
module.exports = User
