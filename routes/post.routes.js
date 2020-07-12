const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const requireLogin = require('../middleware/middleware');
const post = require('../models/post.model');


router.get('/allpost',requireLogin,(req,res)=>{
	console.log("all post");
    post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
})

router.get('/mypost',requireLogin,(req,res)=>{
	
    post.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .sort('-createdAt')
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/getsubpost',requireLogin,(req,res)=>{

    post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/createpost',requireLogin, (req,res)=>{
	const {title,body,url} =req.body;
	if(!title || !body || !url){
		return res.status(422).json({error:"Please provide title and body"});
	}
	req.user.password = undefined;
	const post1 = new post({
		title,body,photo:url,postedBy:req.user
	})
	post1.save().then((result)=>{
		res.json({post:result})
	})
	.catch(err=>{
		console.log(err);
	})
})

router.put('/like',requireLogin, (req,res)=>{
	post.findByIdAndUpdate(req.body.postId,{$push:{likes:req.user._id}},{new:true})
	.exec((err,result)=>{
		if(err){
			return res.status(422).json({error:err})		
		}	
		else{
			return res.json({posts:result})		
		}
	})
})
router.put('/unlike',requireLogin, (req,res)=>{
	post.findByIdAndUpdate(req.body.postId,{$pull:{likes:req.user._id}},{new:true})
	.exec((err,result)=>{
		if(err){
			return res.status(422).json({error:err})		
		}	
		else{
			return res.json({posts:result})		
		}
	})
})
router.put('/comment',requireLogin, (req,res)=>{
	const comment = {
		text:req.body.text,
		postedBy:req.user._id	
	}
	console.log(comment);
	console.log(req.body.postId);
	post.findByIdAndUpdate(req.body.postId,{$push:{comments:comment}},{new:true})
	.populate("comments.postedBy","_id name")	
	.exec((err,result)=>{
		if(err){
			return res.status(422).json({error:err})		
		}	
		else{
			console.log(result);
			return res.json({posts:result})		
		}
	})
})
router.delete('/deletepost/:postid',requireLogin,(req,res)=>{
		console.log(req.params.postid);
		post.findOne({_id:req.params.postid})
		.populate("postedBy","_id")
		.exec((err,post)=>{
			console.log(err+" "+post);
			if(err || !post){
				return res.status(422).json({error:err});			
			}		
			if(post.postedBy._id.toString() === req.user._id.toString()){
				post.remove()
				.then(result=>{
					res.json({result})				
				})
				.catch (err=>{
						console.log(err);				
				})
		}})
})

module.exports = router;
 
