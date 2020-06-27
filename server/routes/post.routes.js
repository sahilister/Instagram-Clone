const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const requireLogin = require('../middleware/middleware');
const post = require('../models/post.model');


router.get('/allpost',requireLogin,(req,res)=>{
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
    Post.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requireLogin, (req,res)=>{
	const {title,body} =req.body;
	if(!title || !body){
		return res.status.json({error:"Please provide title and body"});
	}
	rreq.user.password = undefined;
	const post = new post({
		title,body,postedBy:req.user
	})
	post.save().then((result)=>{
		res.json({post:result})
	})
	.catch(err=>{
		console.log(err);
	})
})

module.exports = router;
