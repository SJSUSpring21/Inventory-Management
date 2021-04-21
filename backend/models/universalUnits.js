const mongoose = require('mongoose')
const universalUnitsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    abbr:{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("UniversalUnits",universalUnitsSchema)