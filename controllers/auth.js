const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Planet = require('../models/Planet')
const Comment = require('../models/Comment')
const bcrypt = require('bcrypt')
const { createUserToken, createNewUserToken, requireToken } = require('../middleware/auth')
const passport = require('passport') // For authentication; must be logged in to see /auth/profile route.

let findComments=(PlanetId)=>{
    Planet.findById(PlanetId).populate({path:'comments',populate:{path:'user'}})
    .exec(function(err,planet){
        if(!err){
            return planet
        }
        else{
            return err
        }
    })
}
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
    .catch( err => {
        console.log( 'ERROR LOGGING IN:', err )
        res.status(401).json( {message: 'Invalid login' })
    })
})

// http://localhost:8000/auth/signup
router.post('/signup', (req, res) => {
    // I should add the age calculation
    //console.log(req.body)
    // console.log(req.body)
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
            return createUserToken(req, createdUser)}) // Creating a token.
        .then(token => res.json({token})) // Sending that token to the frontend.
        .catch(err => {
            console.log('ERROR CREATING USER', err)
            res.status(401).json({ message: 'Error creating new account' })
        })
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
// requireToken is what is giving us/creates the req.user information. Jwt has middleware that does this for us whereas in session we had to define it. 
// Returns password in a JS object because we aren't converting it to JSON. Only when we convert to JSON does the password get omitted (on model/auth.js). 
//    User.findOne({name: 'Bob'}, function (err, user) {
//console.log(req.params.id)
router.get('/profile/comments', requireToken, (req, res) => { // passport.authenticate takes two arguments: what strategy we're using, and options object (incl whether a session is involved).
    // console.log(req.user)
    // console.log("to add comments")   
    let userComments 

    User.findById(req.user.id).populate({path:'comments',populate:{path:'planet'}})
    .exec(function(err,foundUser){
        if(!err){
            // console.log(Search)
            // let searchTerm={planetName:Search.planet.name,}
            userComments=foundUser.comments.map((comment,i)=>{
                return {
                    id:comment._id,
                    planetName:comment.planet.name,
                    content:comment.content,
                    createdAt:comment.createdAt,
                    updatedAt:comment.updatedAt
                }
            })
            console.log("userComments is: ", userComments)
            // return res.json( {'userComments':userComments})
            res.json({ userComments })
        }
        else{
            console.log("Error when grabbing comments by user ID: ", err)
            res.json("Error when grabbing comments by user ID: ", err)
        }
    })
    // console.log(req.params.id)

    // let planetUserComments

    // Planet.find({'comments.user':req.user.id})
    // .then(planets=>{
    //     planetUserComments=planets.map(planet=>{
    //         return  {
    //             name:planet.name,
    //             comments:planet.comments // Comment IDs.
    //         }
    //     })
    //     // console.log('🤞')
    //     // console.log(arr)
    //     // return res.json( {planetUserComments})
    //     console.log("planetUserComments is: ", planetUserComments)
    // })
    // console.log("planetUserComments is: ", planetUserComments)
})

// EDIT PROFILE.
router.put('/profile/edit', requireToken, (req, res) => {
    const profile=JSON.parse(req.body.profile) // This grabs data.profile. Profile includes name, DOB, age, weight.
    console.log('Profile is: ', profile)
    User.findByIdAndUpdate(req.user.id)
    .then( foundUser => {
        foundUser.name = profile.name
        foundUser.DOB = profile.DOB
        foundUser.age = profile.age
        foundUser.weight = profile.weight
        foundUser.save()
        console.log("FoundUser has now been updated to: ", foundUser)
        res.send(createNewUserToken (req, foundUser))
        // return createNewUserToken (req, foundUser) // Returns a token.
    })
    .catch(err => {
        res.send("Error trying to update user by ID ", err)
    })
})
    // these are subdocument function
    // Planet.find({'comments.user':req.user.id})
    // .then(planet=>{
    //     let arr=planet.map(plan=>{
    //         return  {
    //             name:plan.name,
    //             comments:plan.comments
    //         }
    //     })
    //     console.log('🤞')
    //     console.log(arr)
    // })
//})
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