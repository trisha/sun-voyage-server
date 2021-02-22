const mongoose=require('../db/connection')

const options={
    timestamps:true
}


const commentSchema=new mongoose.Schema({
    planet:{
        type:mongoose.Schema.ObjectId
    },
    user:{
        type: mongoose.Schema.ObjectId
    },
    content:{
        type:String,
        required:true
    },
    lastEditDate:Date,
    archived:Boolean

},options)

module.exports=commentSchema