const mongoose=require('../db/connection')
const commentSchema = require('./Comment')

const moonSchema=mongoose.Schema({
    name:String,
    mass:{
        massValue:Number,
        massExponent:Number
    },
    gravity:Number,
    escape:Number,
    sideralOrbit:Number,
    sideralRotation:Number,
    comments:[commentSchema]

})

module.exports= moonSchema