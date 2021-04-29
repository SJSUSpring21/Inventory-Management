const mongoose = require('mongoose')
const quantitySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    abbreviation :{
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("Quantity",quantitySchema)