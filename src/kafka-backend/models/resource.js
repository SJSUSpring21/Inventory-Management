const mongoose = require('mongoose')
const resourceSchema = new mongoose.Schema({
    identifier:{
        type:String,
        required:true
    },
    units:{
        type:String
    },
    type:{
        type:String,
        required:true
    },
    full_name:{
        type:String,
        required:true
    },
    nick_name:{
        type:String
    },
    owner:{
        type: String,
        // ref:"Person"
    },
    purchased_quantity:{
        type: Number,
        // ref:"Quantity"
    },
    available_quantity:{
        type: Number,
        // ref:"Quantity"
    },
    used_quantity:{
        type: Number,
        default: 0
    },
    sku:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    threshold_quantity: {
        type: Number,
        default: 0
    }
},{timestamps:true})

mongoose.model("Resource",resourceSchema)