const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Planet = require('../models/Planet')
const Moon = require('../models/Moon')
const Comment = require('../models/Comment')

router.get('/display/:id', (req, res) => {
    // We use req.params.id to searchForById and grab the planet we're interested in.
    // Then, we send that planet object AND its comments to the client.
    return res.json({ "message":  "We've hit the /planets/display/:id page!" })
})

router.get('/display/:id', (req, res) => {
    // We use req.params.id to searchForById and grab the planet we're interested in.
    // Then, we send that planet object AND its comments to the client.
    return res.json({ "message":  "We've hit the /planets/display/:id page!" })
})

module.exports = router