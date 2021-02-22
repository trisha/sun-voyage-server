const express = require('express')
const router = express.Router()
const { requireToken } = require('../middleware/auth')
const User = require('../models/User')
const Planet = require('../models/Planet')
const Moon = require('../models/Moon')
const Comment = require('../models/Comment')

// SHOW /planets
// http://localhost:8000/planets/
router.get('/', (req, res) => {
    // We need to decide on property names, perhaps req.body.searchTerm
    // Then based on that searchTerm, find relevant planets from Planet.findAll({})
    // And then return that array/object? (I forget which) of planet objects. 
    Planet.find()
    .then(planets=>{
        return res.json({planets})
    })
})

// Display info about planet (not including comments).
// http://localhost:8000/planets/display/:id
router.get('/display/:id', (req, res) => {
    // We use req.params.id to searchForById and grab the planet we're interested in.
    // Then, we send that planet object AND its comments to the client.
    Planet.find({'_id':req.params.id})
    .then(planet=>{
        return res.json({planet})
    })
})
/* SEE COMMENTS.JS INSTEAD:
// Display comments for each planet. 
// (Need to have this separate so that we can require a token, so that we know which comments to put an edit or delete button next to.)
*/
// Display archived comments about planet.
// http://localhost:8000/planets/archive/:id
router.get('/archive/:id', (req, res) => {
    
    // Not including 'return' also seems to work in Postman.
    res.json({ message: `We've hit the /planets/archive/${req.params.id} route!`})
})
module.exports = router