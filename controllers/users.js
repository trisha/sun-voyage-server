const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { createUserToken, requireToken } = require('../middleware/auth')
const passport = require('passport') // For authentication; must be logged in to see /api/private route.

// CREATE.
router.post('/login', (req, res) => {
    // res.send("We've hit the /api/login POST route.")
    User.findOne( {email: req.body.email })
    .then(foundUser => createUserToken (req, foundUser))
//    .then(token => res.json( {token} )) // Using curly braces returns JSON object with 'token' as the key and a string value. Without curly braces, it only returns the string value.
    .then(token => res.status(201).json( {token} ))
    .catch( err => console.log( 'ERROR LOGGING IN:', err ))
})

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hashedPassword => ({
        email: req.body.email,
        password: hashedPassword,
        motto: req.body.motto
    }))
    .then(hashedUser => {
        User.create(hashedUser) // hashedUser is a javascript object that gets sent to and created in Mongo.
        // .then(createdUser => res.json(createdUser))
        .then(createdUser => createUserToken(req, createdUser)) // Creating a token.
        .then(token => res.json({token})) // Sending that token to the frontend.
        .catch(err => console.log('ERROR CREATING USER', err))
    })
    // res.send("We've hit the /api/signup POST route.")
})

// PRIVATE ROUTE
// GET /api/private
router.get('/private', requireToken, (req, res) => { // passport.authenticate takes two arguments: what strategy we're using, and options object (incl whether a session is involved).
    // requireToken is what is giving us/creates the req.user information. Jwt has middleware that does this for us whereas in session we had to define it. 
    console.log(req.user) // Returns password in a JS object because we aren't converting it to JSON. Only when we convert to JSON does the password get omitted (on model/auth.js). 
    return res.json( {'message': 'thou hath been granted permission to access this route!'})
})

// POST to login, copy and paste token value (not including strings)
// Then, GET /api/private and click on 'Headers' tab. Key: Authorization, Value: Bearer <token>
// Space between Bearer and the copy and pasted token.

module.exports = router