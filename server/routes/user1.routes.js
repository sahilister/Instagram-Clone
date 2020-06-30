const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const requireLogin = require('../middleware/middleware');
const post = require('../models/post.model');
const user = require('../models/user.model');

router.get('/user/:id',requireLogin,(req,res)=>{
	user.findOne({_id:req.param.id})
	.select("-password")
	.then(user=>{
			post.find({postedBy:req.param.id})
			.populate("postedBy","_id name")
			.exec((err,post)=>{
				if(err){
					return res.status(422).json({error:err});				
				}
				res.json({user,post});			
			})
	})
	.catch(err=>{
		return res.status(404).json({error:"User not found"});
	})

})