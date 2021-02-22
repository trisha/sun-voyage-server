const mongoose = require('../db/connection')
const commentSchema = require('./Comment')
const options = {
    timestamps: true,
    toJSON: {
        virtuals: true, 
        transform: (_doc, userDocToReturn) => {
            delete userDocToReturn.password
            return userDocToReturn
        }
    }
}

// mongoose.Schema is a constructor method. Takes in schema and options as arguments.
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength:10
    },
    name:{
        required:true,
        type:String
    },
    DOB:{
        type:String,
        required:true,
    },
    weight:{
        type:Number,
        required:true
    },
    comments:[commentSchema],
    age:Number
}, options)

module.exports = mongoose.model('User', userSchema)