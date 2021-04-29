const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const mongoose = require('mongoose')
const Person =  mongoose.model("Person")
module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    console.log(authorization)
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
        Person.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
    })
}