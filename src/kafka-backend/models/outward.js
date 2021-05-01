const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const outwardSchema = new mongoose.Schema({
    resource:{
        // type:ObjectId,
        // ref:"Resource"
        type : String
    },
    quantity :{
        // type:ObjectId,
        // ref:"Quantity"
        type: Number
    },
    requested_by:{
        // type:ObjectId,
        // ref:"Person"
        type: String
    },
    transporter:{
        // type:ObjectId,
        // ref:"Person"
        type: String
    },
    location:{
        // type:ObjectId,
        // ref:"Location"
        type: String
    },
    comments:{
        type:String,
        required:true
    },
    vehicleNo:{
        type:String,
        required:true
    },
    contractor:{
        type:String,
        required:true
    },
    type:{
        type:String,
        default:"Outward"
    }
},{timestamps:true})

mongoose.model("Outward",outwardSchema)