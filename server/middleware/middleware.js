const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const mongoose = require('mongoose');
const User  = require('../models/user.model');
module.exports = (req,res,next) =>{
 const {authorization} = req.headers;
 if(!authorization){
 	return res.status(401).json({error:"You must be log in"});
 }
 const token = authorization.replace("Bearer ","");
 jwt.verify(token,JWT_SECRET,(err,payload)=>{
 	if(err){
 		return res.status(401).json({error:"You must be logged in"});
 	}
 	console.log(payload);
 	const {_id} = payload;
 	//console.log(_id);
 	User.findById(_id).then(userdata=>{
 		req.user = userdata
 		//console.log(userdata);
 		next()
 	})
 	
 })
}
