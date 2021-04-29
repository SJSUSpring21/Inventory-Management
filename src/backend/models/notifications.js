const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const notificationSchema = new mongoose.Schema({
    alert:{
        type:ObjectId,
        ref:"Person"
    }
},{timestamps:true})

mongoose.model("Notifications",notificationSchema)