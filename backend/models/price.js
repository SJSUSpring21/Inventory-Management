const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const priceSchema = new mongoose.Schema({
    currency :{
        type:String,
        required:true
    },
    taxes :{
        type:String,
        required:true
    },
    unit_price :{
        type:String,
        required:true
    },
    total_cost :{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("Price",priceSchema)