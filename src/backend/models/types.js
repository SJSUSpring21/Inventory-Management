const mongoose = require('mongoose')
const typesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("Types",typesSchema)