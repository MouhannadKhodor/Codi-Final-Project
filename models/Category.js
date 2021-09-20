const mongoose = require('mongoose')


const CategorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
})

module.exports = mongoose.model('Categories',CategorySchema)