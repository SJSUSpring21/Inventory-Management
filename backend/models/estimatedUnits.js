const mongoose = require('mongoose')
const estimatedUnitsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    abbr:{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("EstimatedUnits",estimatedUnitsSchema)