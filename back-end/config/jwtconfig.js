/* eslint-disable func-names */
const mongoose = require('mongoose')
const passportJWT = require('passport-jwt')
const dotenv = require('dotenv')
const User = require('../models/User')

const ObjectId = mongoose.Types.ObjectId
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

dotenv.config({ silent: true })

// set up some JWT authentication options for passport
const jwtOptions = {
    // look for the Authorization request header
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    // an arbitrary string used during encryption - see the .env file
    secretOrKey: process.env.JWT_SECRET
}

// define the method that is used by passport to verify the contents
// (i.e. the payload) of the JWT token
const jwtVerifyToken = async (jwtPayload, next) => {
    // check if the token has expired
    const expirationDate = new Date(jwtPayload.exp * 1000) // convert from seconds to milliseconds
    if (expirationDate < new Date()) {
        // the token has expired
        return next(null, false, { message: 'JWT token has expired.' })
    }

    // try to find a matching user in our database
    const userId = new ObjectId(jwtPayload.id) // convert the string id to an ObjectId
    const user = await User.findOne({ _id: userId }).exec()
    if (user) {
        // we found the user... keep going
        return next(null, user)
    }
    // we didn't find the user... fail!
    return next(null, false, { message: 'User not found' })
}

const strategy = new JwtStrategy(jwtOptions, jwtVerifyToken)
module.exports = strategy
