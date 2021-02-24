const express = require('express')
const router = express.Router()
const { requireToken } = require('../middleware/auth')
const User = require('../models/User')
const Planet = require('../models/Planet')
const Moon = require('../models/Moon')
const Comment = require('../models/Comment')

// Display a planet's comments. Use below URL for Mercury:
// http://localhost:8000/comments/display/6033f85cf487a44600fe84b2 
/*
router.get('/display/:planetId', (req, res) => {
    console.log('🔥', req.user)
    let planet = Planet.find({ id: req.params.planetId })
    let comments = planet.comments
    return res.json({ comments })
    // return res.json({ "message":  "We've hit the /comments/display/:planetId page!" })
})
*/

// Add a new comment to /comments/add/planet:id. Must be logged in. Below URL is for Mercury:
// http://localhost:8000/comments/add/6033f85cf487a44600fe84b2 
router.post('/add/:planetId', requireToken, (req, res) => {
    Planet.findById( req.params.planetId )
    .then(foundPlanet => {
        foundPlanet.comments.push({
            planet: req.body.planet, // Planet mongoose ID.
            user: req.user.id, // User mongoose ID.
            content: req.body.comment,
            archived: false // TO-DO: ADD LOGIC THAT DETERMINES WHETHER THIS COMMENT IS ARCHIVED OR NOT.
        })
        foundPlanet.save()

        return res.json({ foundPlanet }) // Sends updated planet with added comment.
    })
    .catch( err => {
        console.log("Error finding planet by ID ", err)
    })


    // We use req.params.id to know which planet this comment belongs to.
    // We create a comment using req.body.title, req.body.content, etc.
    // return res.redirect(`/planets.display/${req.params.planetId}`, comments={newComments})
    // return res.json({ "message":  "We've hit the /comments/add/:planetId page!" })


})

// Edit comment but only if you're the author.
// We need comment id and planet id
router.put('/edit/:planetId/:commentId', requireToken, (req, res) => {
    // Find comment by ID. 
    // Verify that email matches logged in user's email.
    Planet.findByIdAndUpdate(req.params.planetId)
    .then(planet=>{
            let test= planet.comments.id(req.params.commentId)
            if(test.user==req.user.id){

                test['content']=req.body.message
                planet.save(function(err){
                    if(!err){

                        return res.json( {message:"true"})
                    }
                })
            }
            else{
                    return res.json({message:"unathorized"})
            }
})
.catch(err=>{
    console.log(err)
    return res.json({message:'false'})
})
   // return res.json({ "message":  "We've hit the /planets/display/:id page!" })
})

// Delete comment but only if you're the author.
// DELETE to http://localhost:8000/comments/delete/:id
// In Postman, put your token in Headers: key='Authorization', value=`Bearer ${token}`
router.delete('/delete/:planetId/:commentId', requireToken, (req, res) => {
    // Find comment by ID
    // Verify that user email matches logged in user email
    Planet.findByIdAndUpdate(req.params.planetId)
    .then(planet=>{
            let test= planet.comments.id(req.params.commentId)
            if(test.user==req.user.id){
                planet.comments.id(req.params.commentId).remove()
                test['content']=req.body.message
                planet.save(function(err){
                    if(!err){
                        return res.json( {message:"true"})
                    }
                })
            }
            else{
                    return res.json({message:"unathorized"})
            }
})
    return res.json({ "message": "We've hit the delete a comment route."})
}) 

module.exports = router