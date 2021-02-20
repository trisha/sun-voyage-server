const mongoose=require('../db/connection')
const commentSchema = require('./Comment')

const planetSchema=mongoose.Schema({
    moons:[
        {
            id:String,
            rel:String
        }
    ],
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