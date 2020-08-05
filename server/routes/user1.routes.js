const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const requireLogin = require('../middleware/middleware');
const post = require('../models/post.model');
const user = require('../models/user.model');

router.get('/user/:id',requireLogin,(req,res)=>{
	console.log(req.params.id);
	user.findOne({_id:req.params.id})
	.select("-password")
	.then(user=>{
			post.find({postedBy:req.params.id})
			.populate("postedBy","_id name url")
			.exec((err,post)=>{
				if(err){
					return res.status(422).json({error:err});				
				}
				console.log(user);
				res.json({user,post});			
			})
	})
	.catch(err=>{
		return res.status(404).json({error:"User not found"});
	})

})

router.put('/follow',requireLogin,(req,res)=>{
	user.findByIdAndUpdate(req.user._id,{$push:{following:req.body.followId}},{new:true},(err,result)=>{
			if(err){
				return res.status(422).json({error:err});			
			}
		user.findByIdAndUpdate(req.body.followId,{$push:{followers:req.user._id}},{new:true})
		.select("-password").then(result=>{
			return res.json(result);		
		})
		.catch(err=>{
			return res.json({error:err});		
		})		
		})
})
router.put('/unfollow',requireLogin,(req,res)=>{
		user.findByIdAndUpdate(req.user._id,{$pull:{following:req.body.unfollowId}},{new:true},(err,result)=>{
			if(err){
				return res.status(422).json({error:err});			
			}
		user.findByIdAndUpdate(req.body.unfollowId,{$pull:{followers:req.user._id}},{new:true})
		.select("-password").then(result=>{
			return res.json(result);		
		})
		.catch(err=>{
			return res.json({error:err});		
		})		
		})
})
module.exports=router;