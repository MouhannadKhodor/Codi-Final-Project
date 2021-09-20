const { number } = require('@hapi/joi')
const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
        max:1024,
    },
    date:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        default:"1"
    }
})

module.exports = mongoose.model('Users',UserSchema)