const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Planet = require('../models/Planet')
const Moon = require('../models/Moon')
const Comment = require('../models/Comment')


// SHOW /planets
router.get('/', (req, res) => {
    // We need to decide on property names, perhaps req.body.searchTerm
    // Then based on that searchTerm, find relevant planets from Planet.findAll({})
    // And then return that array/object? (I forget which) of planet objects. 
    return res.json({ "message": "We've hit the /planets page!" })
})

// Display info about planet (not including comments).
router.get('/display/:id', (req, res) => {
    // We use req.params.id to searchForById and grab the planet we're interested in.
    // Then, we send that planet object AND its comments to the client.
    return res.json({ "message":  "We've hit the /planets/display/:id page!" })
})

/* SEE COMMENTS.JS INSTEAD:
// Display comments for each planet. 
// (Need to have this separate so that we can require a token, so that we know which comments to put an edit or delete button next to.)
router.get('/display/comments/:id', requireToken, (req, res) => {
    // We use req.params.id to searchForById and grab the planet we're interested in.
    // Then, we send that planet object AND its comments to the client.
    return res.json({ "message":  "We've hit the /planets/display/:id page!" })
})
*/

// Display archived comments about planet.
router.get('/archive/:id', (req, res) => {

})


module.exports = router