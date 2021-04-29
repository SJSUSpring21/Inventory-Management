const mongoose = require('mongoose')
const inwardOutwardSchema = new mongoose.Schema({
    resource:{
        type:String
    },
    quantity :{
        type: Number
    },
    sourced_by:{
        type: String
    },
    price:{
        type:Number
    },
    date:{
        type:String
    },
    organization:{
        type:String,
    },
    comments:{
        type:String
    },
    billNo:{
        type:String
    },
    type:{
        type:String
    },
    requested_by:{
        type: String
    },
    transporter:{
        type: String
    },
    supplier:{
        type: String
    },
    location:{
        type: String
    },
    vehicleNo:{
        type:String
    },
    contractor:{
        type:String
    },
    type:{
        type:String
    },
    GST:{
        type: String,
        default:0
    },
    outward_sequence:{
        type: Number,
        default: 0
    },
    return_quantity:{
        type: Number,
        default: 0
    }
},{timestamps:true})

mongoose.model("InwardOutward",inwardOutwardSchema)