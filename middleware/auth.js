require('dotenv').config()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// Import constructor for creating JWT strategies
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt 
const User = require('../models/User')

const options = {
    secretOrKey: process.env.JWT_SECRET,
    // How passport should find and extract the token from the request (ie look at header)
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // How we want to get the request back. We'll be putting the token in the header itself.
}

// jwt_payload is what Strategy passes into findUser.
const findUser = (jwt_payload, done) => { // Done callback is an argument that passport passes.
    User.findById(jwt_payload.id)
    .then(foundUser => done(null, foundUser))
    .catch(err => done(err))
}

// Construct the strategy. Constructor takes 2 parameters: options object, findUser callback fxn.
const strategy = new Strategy(options, findUser)


// 'Register the strategy so that passport uses it when we call the passport.authenticate() method
passport.use(strategy)

// Initialize the passport middleware based on the above configuration
passport.initialize()

// We will export this and use it in the login route to create a token each time a user logs in (or signs up).
// Grab user from database based on email. Then compare if passwords match.
const createUserToken = (req, user) => {
    const validPassword = req.body.password ?
        bcrypt.compareSync(req.body.password, user.password) : false // compareSync provided by bcrypt.
    
    // Above ternary is the same as coding the below:
    // const validPassword
    // if (req.body.password) { 
    //  validPassword = bcrypt.compareSync(req.body.password, user.password)
    // } else { 
    //     validPassword = false 
    // }

    if (!user || !validPassword) {
        const err = new Error('The provided email OR password is incorrect.') // Error is vanilla JavaScript
        err.statusCode = 422
        throw err
    } else { // If the email and password are legit (don't send back password)
        const payload = {
            id: user._id,
            email: user.email,
            motto: user.motto
        }
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }) // 3600 seconds if 15 minutes.
    }
}

const requireToken = passport.authenticate('jwt', { session: false })

module.exports = { createUserToken, requireToken }