const mongoose=require('../db/connection')

const moonSchema=new mongoose.Schema({
    name:String,
    mass:{
        massValue:Number,
        massExponent:Number
    },
    gravity:Number,
    escape:Number,
    sideralOrbit:Number,
    sideralRotation:Number,


})

module.exports= moonSchema