const mongoose=require('../db/connection')

const options={
    timestamps:true
    // Gives us 'createdAt' and 'updatedAt' values in this format: 
    // 2021-02-22T15:25:32.916+00:00.
}

// Screenshot of sample comment: https://files.slack.com/files-pri/T0351JZQ0-F01NYALE90B/image.png
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
    createDate:Date, // So we can convert 'createAt' into a format we can simply print to the UI.
    lastEditDate:Date, // So we can convert 'updatedAt' into a printable format.
    archived:Boolean
}, options)

module.exports=commentSchema

