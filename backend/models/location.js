const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const locationSchema = new mongoose.Schema({
    person_id:{
        type:ObjectId,
        ref:"Person"
    },
    coordinates :{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("Location",locationSchema)