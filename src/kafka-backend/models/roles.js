const mongoose = require('mongoose')
const rolesSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("Roles",rolesSchema)