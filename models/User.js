const mongoose = require('../db/connection')
//const commentSchema = require('./Comment')
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
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    email: {
        type: String,
        unique: true,
        required: false,
        lowercase: true // Always converts email to lowercase. Source: https://mongoosejs.com/docs/schematypes.html 
    },
    password: {
        type: String,
        required: true,
        minlength:10
    },
    name:{
        required:false,
        type:String
    },
    DOB:{
        type:String,
        required:false,
    },
    weight:{
        type:Number,
        required:false
    },
    age:Number
}, options)

module.exports = mongoose.model('User', userSchema)