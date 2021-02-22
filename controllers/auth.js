const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { createUserToken, requireToken } = require('../middleware/auth')
const passport = require('passport') // For authentication; must be logged in to see /auth/profile route.

// http://localhost:8000/auth/login
router.post('/login', (req, res) => {
    // res.send("We've hit the /api/login POST route.")
    User.findOne( {email: req.body.email })
    .then(foundUser => createUserToken (req, foundUser))
//    .then(token => res.json( {token} )) // Using curly braces returns JSON object with 'token' as the key and a string value. Without curly braces, it only returns the string value.
    .then(token => res.status(201).json( {token} ))
    .catch( err => console.log( 'ERROR LOGGING IN:', err ))
})

// http://localhost:8000/auth/signup
router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hashedPassword => ({
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        weight: req.body.weight,
        DOB: req.body.DOB
    }))
    .then(hashedUser => {
        User.create(hashedUser) // hashedUser is a javascript object that gets sent to and created in Mongo.
        // .then(createdUser => res.json(createdUser))
        .then(createdUser => {
            // Lines 33 and 34 are for test it will remove
            createdUser.comments.push({content:"Hello this is just for test",planet:"60317bdb042ec95f348177f9"},{content:"the second one"})
            createdUser.save()
            return createUserToken(req, createdUser)}) // Creating a token.
        .then(token => res.json({token})) // Sending that token to the frontend.
        .catch(err => console.log('ERROR CREATING USER', err))
    })
    // res.send("We've hit the /auth/signup POST route.")
})

// http://localhost:8000/auth/profile
router.get('/profile', requireToken, (req, res) => {
    console.log(req.user)
    return res.json({ 'message': `Welcome to your profile page, ${req.user.name}`})
})

// How to use requireToken:
// In Postman, when you POST to login (or anywhere that prints or sends the token),
// copy and paste token value (not including strings).
// Then, in Postman GET /auth/profile and click on 'Headers' tab. 
// Field values = Key: Authorization, Value: Bearer <copyAndPasteToken>
// Note the space between Bearer and the copy and pasted token.

module.exports = router