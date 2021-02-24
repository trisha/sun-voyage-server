const express = require('express')
const router = express.Router()
const { requireToken } = require('../middleware/auth')
const User = require('../models/User')
const Planet = require('../models/Planet')
const Moon = require('../models/Moon')
const Comment = require('../models/Comment')
const axios = require('axios')

// Send information on all planets. Each planet has embedded comments as a subdocument. 
// http://localhost:8000/planets/
router.get('/', (req, res) => {
<<<<<<< HEAD
=======
    // We need to decide on property names, perhaps req.body.searchTerm
    // Then based on that searchTerm, find relevant planets from Planet.findAll({})
    // And then return that array/object? (I forget which) of planet objects. 
    
>>>>>>> main
    Planet.find()
    .then(planets=>{
        console.log('👏')
        console.log(planets)
        return res.json({planets})
    })
    .catch(err=>{
        console.log('😎')
        console.log(err)
        return res.json({err})
    })
})

// Display info about a specific planet.
// http://localhost:8000/planets/display/:id
router.get('/display/:id', (req, res) => {
    Planet.find({'_id':req.params.id})
    .then(planet=>{
        return res.json({planet})
    })
})

<<<<<<< HEAD
=======
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
>>>>>>> main
module.exports = router