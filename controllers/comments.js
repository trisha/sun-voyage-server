const express = require('express')
const router = express.Router()
const { requireToken } = require('../middleware/auth')
const User = require('../models/User')
const Planet = require('../models/Planet')
const Moon = require('../models/Moon')
const Comment = require('../models/Comment')

// Display a planet's comments. Use below URL for Mercury:
// http://localhost:8000/comments/display/6033f85cf487a44600fe84b2 
router.get('/display/:planetId', (req, res) => {
    console.log('🔥', req.user)
    let planet = Planet.find({ id: req.params.planetId })
    let comments = planet.comments
    return res.json({ comments })
    // return res.json({ "message":  "We've hit the /comments/display/:planetId page!" })
})

// Add a new comment to /comments/add/planet:id. Must be logged in. Below URL is for Mercury:
// http://localhost:8000/comments/add/6033f85cf487a44600fe84b2 


router.post('/add/:planetId', requireToken, (req, res) => {
    let comment = JSON.parse(req.body.comment) // req.body.userData, req.body.comment
    Planet.findById( comment.planet )
    .then(async foundPlanet => {
        await foundPlanet.comments.push({
            planet: req.body.planet, // Planet mongoose ID.
            user: comment.user, // User mongoose ID.
            content: comment.content,
            archived: false // TO-DO: ADD LOGIC THAT DETERMINES WHETHER THIS COMMENT IS ARCHIVED OR NOT.
        })
        await foundPlanet.save()
        res.json({ foundPlanet }) // Sends updated planet with added comment.
    })
    .catch( err => {
        console.log("Error trying to add a comment to a planet by planet ID ", err)
    })
})

// Edit comment but only if you're the author.
// We need comment id and planet id
router.put('/edit/:planetId/:commentId', requireToken, (req, res) => {
    // Find comment by ID. 
    // Verify that email matches logged in user's email.
//     Planet.find({'comments.id':req.params.commentId})
//     .then(planet=>{
//         let arr=planet.map(plan=>{
//             return  {
//                 name:plan.name,
//                 comments:plan.comments
//             }
//         })
//         // console.log('🤞')
//         // console.log(arr)
//         return res.json( {arr})
// })
    Planet.findByIdAndUpdate(req.params.planetId)
    .then(planet=>{
        let test= planet.comments.id(req.params.commentId)
        console.log("💕")
        console.log(test)
        test['content']=req.body.message
        //test.save()
        planet.save()
    
        // .then(comment=>{
        //     console.log("💕")
        //     console.log(comment)
        // })
        
        // planet.comments.forEach(comment=>{
        //     console.log("💕")
        //     console.log(comment.id)
        //     if(comment.id==req.params.commentId){
        //         comment.content=req.body.message
        //     }
        // })
        //planet.save()
        return res.json( {message:"true"})
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
router.delete('/delete/:id', requireToken, (req, res) => {
    // Find comment by ID
    // Verify that user email matches logged in user email
    return res.json({ "message": "We've hit the delete a comment route."})
}) 

module.exports = router