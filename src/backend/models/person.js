const mongoose = require('mongoose')
const personSchema = new mongoose.Schema({
    first_name :{
        type:String,
        required:true
    },
    last_name :{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    phone :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    organization:{
        type:String,
        required:true
    },
    current_location :{
        type:String,
        required:true
    },
    address:{
        type:String,
        // required:true
    }
},{timestamps:true})

mongoose.model("Person",personSchema)