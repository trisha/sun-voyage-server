const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Planet = require('../models/Planet')
const bcrypt = require('bcrypt')
const { createUserToken, requireToken } = require('../middleware/auth')
const passport = require('passport') // For authentication; must be logged in to see /auth/profile route.

// http://localhost:8000/auth/login
router.post('/login', (req, res) => {
    // res.send("We've hit the /api/login POST route.")
    
    User.findOne( {email: req.body.email })
    .then(foundUser => {
        //here is just for test to see we can save comments and when user come to the profile can send the comments
        // it will remove for future
        // Planet.findOne({'name':'Mercury'})
        // .then(planet=>{
        //     planet.comments.push({user:foundUser.id,planet:planet.id,content:'this for test'},{user:foundUser.id,planet:planet.id,content:'Thanks to update my comments'})
        //     console.log('🤞')
        //     console.log(planet)
        //     planet.save()
        // })
        return createUserToken (req, foundUser)})
//    .then(token => res.json( {token} )) // Using curly braces returns JSON object with 'token' as the key and a string value. Without curly braces, it only returns the string value.
    .then(token => res.status(201).json( {token} ))
    .catch( err => console.log( 'ERROR LOGGING IN:', err ))
})

// http://localhost:8000/auth/signup
router.post('/signup', (req, res) => {
    // I should add the age calculation
    //console.log(req.body)
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
            createdUser.comments.push({content:"Test comment being added upon user signup",planet:"60317bdb042ec95f348177f9",user:createdUser.id},{content:"the second one"})
            createdUser.save()
            return createUserToken(req, createdUser)}) // Creating a token.
        .then(token => res.json({token})) // Sending that token to the frontend.
        .catch(err => console.log('ERROR CREATING USER', err))
    })
    // res.send("We've hit the /auth/signup POST route.")
})

// http://localhost:8000/auth/profile
// router.get('/profile', requireToken, (req, res) => {
//     console.log(req.user)
//     return res.json({ 'message': `Welcome to your profile page, ${req.user.name}`})
// })

// PRIVATE ROUTE
// GET /auth/profile
router.get('/profile', requireToken, (req, res) => { // passport.authenticate takes two arguments: what strategy we're using, and options object (incl whether a session is involved).
    // requireToken is what is giving us/creates the req.user information. Jwt has middleware that does this for us whereas in session we had to define it. 
   // Returns password in a JS object because we aren't converting it to JSON. Only when we convert to JSON does the password get omitted (on model/auth.js). 
//    User.findOne({name: 'Bob'}, function (err, user) {
    //console.log(req.params.id)
    Planet.find({'comments.user':req.user.id})
    .then(planet=>{
        let arr=planet.map(plan=>{
            return  {
                name:plan.name,
                comments:plan.comments
            }
        })
        // console.log('🤞')
        // console.log(arr)
        return res.json( {arr})
})

})

// POST to login, copy and paste token value (not including strings)
// Then, GET /api/private and click on 'Headers' tab. Key: Authorization, Value: Bearer <token>
// Space between Bearer and the copy and pasted token.
// How to use requireToken:
// In Postman, when you POST to login (or anywhere that prints or sends the token),
// copy and paste token value (not including strings).
// Then, in Postman GET /auth/profile and click on 'Headers' tab. 
// Field values = Key: Authorization, Value: Bearer <copyAndPasteToken>
// Note the space between Bearer and the copy and pasted token.

module.exports = router