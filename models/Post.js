const mongoose = require('mongoose');
const {Schema} = require('mongoose')


const PostSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    categoryID:{
        type:Schema.Types.ObjectId,
        ref:"Categories",
        // type:String,
        // required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
})


module.exports = mongoose.model('Posts',PostSchema)