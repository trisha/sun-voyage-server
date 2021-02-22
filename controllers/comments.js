const express = require('express')
const router = express.Router()
const { requireToken } = require('../middleware/auth')
const User = require('../models/User')
const Planet = require('../models/Planet')
const Moon = require('../models/Moon')
const Comment = require('../models/Comment')

// Display a planet's comments.
// http://localhost:8000/comment/display/:planetId
router.get('/display/:planetId', (req, res) => {
    return res.json({ "message":  "We've hit the /comments/display/:planetId page!" })
})

// Add a new comment to /comments/add/planet:id 
// http://localhost:8000/comment/add/:planetId
router.post('/add/:planetId', (req, res) => {
    console.log('✔✔✔✔✔✔✔')
    console.log(req.body.message)
    // We use req.params.id to know which planet this comment belongs to.
    // We create a comment using req.body.title, req.body.content, etc.
    // return res.redirect(`/planets.display/${req.params.planetId}`, comments={newComments})

    return res.json({ "message":  "We've hit the /comments/add/:planetId page!" })
})

// Edit comment but only if you're the author.
router.put('/edit/:id', requireToken, (req, res) => {
    // Find comment by ID. 
    // Verify that email matches logged in user's email.
    Planet.findById({'_id':req.params.id})
    .then(planet=>{
        let arr=planet.map(plan=>{
            return  {
                name:plan.name,
                comments:plan.comments
            }
        })
        console.log('🤞')
        console.log(arr)
        return res.json( {arr})
})
    return res.json({ "message":  "We've hit the /planets/display/:id page!" })
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