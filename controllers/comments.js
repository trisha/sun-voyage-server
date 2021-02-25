const express = require('express')
const router = express.Router()
const { requireToken } = require('../middleware/auth')
const User = require('../models/User')
const Planet = require('../models/Planet')
const Moon = require('../models/Moon')
const Comment = require('../models/Comment')
const { json } = require('express')
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
// Add a new comment to /comments/add/planet:id. Must be logged in. Below URL is for Mercury:
// http://localhost:8000/comments/add/6033f85cf487a44600fe84b2 
router.post('/add/:planetId', requireToken, (req, res) => {
    console.log("at add comments")
    //let content=json.parse(req.body.comment)
    Comment.create({
        content:req.body.comment,
        planet:req.params.planetId,
        user: req.user._id
    })
    .then(comment=>{
        console.log(comment)
        req.user.comments.push(comment)
        req.user.save((err,user)=>{
            if(!err){
                console.log(user)
            }
            else{
                console.log(`Error message from add comment to user ${err}`)
            }
        })
        Planet.findById(req.params.planetId)
    .then(planet=>{
        planet.comments.push(comment)
        planet.save((err,planet)=>{
            if(!err){
                console.log(planet)
                Planet.findById(planet.id).populate({path:'comments',populate:{path:'user'}})
                .exec(function(err,planet){
                    if(!err){
                        console.log("❤❤")
                        console.log(planet)
                        let searchTerm=planet.comments.map((data,i)=>{
                            return {
                                user:data.user.name,
                                content:data.content
                            }
                        })
                        return res.json( {'searchTerm':searchTerm})
                    }
                    else{
                        return err
                    }
                })
            }
            else{
                console.log('👏👏')
                console.log(err)
            }
    
        })
    })
        foundPlanet.save()
        return res.json({ foundPlanet }) // Sends updated planet with added comment.
    })
    .catch(err=>{
        console.log("😎😎")
        console.log(err)
    
    })
})
// add comments by subdocuments function

//     Planet.findById( req.params.planetId )
//     .then(foundPlanet => {
//         foundPlanet.comments.push({
//             planet: req.body.planet, // Planet mongoose ID.
//             user: req.user.id, // User mongoose ID.
//             content: content.comment,
//             archived: false // TO-DO: ADD LOGIC THAT DETERMINES WHETHER THIS COMMENT IS ARCHIVED OR NOT.
//         })
//         foundPlanet.save()

//         return res.json({ foundPlanet }) // Sends updated planet with added comment.
//     })
//     .catch( err => {
//         console.log("Error finding planet by ID ", err)
//     })
// })
//add comments by obj ref function
// Edit comment but only if you're the author.
// We need comment id and planet id
router.put('/edit/:planetId/:commentId', requireToken, (req, res) => {
    // Find comment by ID. 
    // Verify that email matches logged in user's email.
    console.log(req.params.commentId)
    Comment.findById(req.params.commentId)
    .then(comment=>{
        if(comment.user==req.user.id){

            comment.content="I edited"
            comment.save((err,c)=>{
    
                console.log(c)
                if(!err){
                    Planet.findById(req.params.planetId).populate({path:'comments',populate:{path:'user'}})
                    .exec(function(err,planet){
                        if(!err){
                            console.log("❤❤")
                            console.log(planet)
                            let searchTerm=planet.comments.map((data,i)=>{
                                return {
                                    user:data.user.name,
                                    content:data.content
                                }
                            })
                            return res.json( {'searchTerm':searchTerm})
                        }
                        else{
                            return err
                        }
                    })
                }


            })
        }
        else{
            return res.json({"message":"unathorize"})
        }
    })
//     Planet.findByIdAndUpdate(req.params.planetId)
//     .then(planet=>{
//             let test= planet.comments.id(req.params.commentId)
//                 test['content']=req.body.content
//                 planet.save(function(err){
//                     if(!err){
//                         return res.json( {planet})
//                     }
//                 })
// })
.catch(err=>{
    console.log(err)
    return res.json({err})
})
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
                planet.comments.id(req.params.commentId).remove()
                test['content']=req.body.message
                planet.save(function(err){
                    if(!err){
                        return res.json(planet)
                    }
                })
})
}) 

module.exports = router