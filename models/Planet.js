const mongoose=require('../db/connection')
const commentSchema = require('./Comment')
const moonSchema = require('./Moon')

const planetSchema=mongoose.Schema({
    name:String,
    moons:[moonSchema],
    mass:{
        massValue:Number,
        massExponent:Number
    },
    gravity:Number,
    escape:Number,
    sideralOrbit:Number,
    sideralRotation:Number,
    comments:[commentSchema],
    archivedComments:[commentSchema] // Once comments.length >= 10 we push them to them to archivedComments.

})

module.exports= mongoose.model('Planet', planetSchema)