const mongoose = require('mongoose')
const organizationSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    // website :{
    //     type:String,
    //     required:true
    // },
    // phone_number :{
    //     type:String,
    //     required:true
    // }
},{timestamps:true})
    
mongoose.model("Organization",organizationSchema)