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
        required: true,
        lowercase: true // Always converts email to lowercase. Source: https://mongoosejs.com/docs/schematypes.html 
    },
    password: {
        type: String,
        required:true,
        minlength:10
    },
    name:{
        required:true,
        type:String
    },
    DOB:String,
    weight:Number,
    age:Number
}, options)

module.exports = mongoose.model('User', userSchema)