const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    senderID:{
        type:String,
        required:true,
    },
    receiverID:{
        type:String,
        required:true,
    },
    senderUsername:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
})


module.exports = mongoose.model('Messages',MessageSchema)