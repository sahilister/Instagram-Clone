const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto')
const User = require('.././models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const requireLogin = require('../middleware/middleware')
router.get('/',(req,res)=>{
	res.send('hello');
})
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sahilgarg99912@gmail.com',
    pass: '1234@sahil' // naturally, replace both with your real credentials or an application-specific password
  }
});

router.post('/signup',(req,res)=>{
	const {name,email,password}=req.body;
	if(!email || !password || !name){
		return res.status(422).json({error:"please add all the field"})
	}
	User.findOne({email:email})
	.then((savedUser)=>{
		if(savedUser){
			return res.status(422).json({error:'User already exist'});
		}
		bcrypt.hash(password,13)
			.then(hashedpassword=>{
				const user=!req.body.url?user = new User({email,password:hashedpassword,name}): user = new User({email,password:hashedpassword,name,url:req.body.url});
			user.save()
			.then((user)=>{
				transporter.sendMail({
					to:user.email,
					from:"no-reply@insta",
					subject:'Sign up successfully',
					html:"<h1>Welcome to insta</h2>"				
				})
				.then(()=>{
				res.json({message:"Saved successfully"});
				})
				.catch(err=>{
				console.log(err);
					res.status(500).json({message:"An error occured"});
				})
			})
			.catch(err=>{
					console.log(err);
			})
		})
		
	})
	.catch((err)=>{
		console.log(err);
	})
})

router.put('/uploadpic',requireLogin,(req,res)=>{
	User.findByIdAndUpdate(req.user._id,{$set:{url:req.body.url}},{new:true})
	.select("-password")
	.then(user=>{
		return res.json({url:user.url});
	})
	.catch(err=>{
		return res.status(404).json({error:"User not found"});
	})
})

router.post('/signin',(req,res)=>{
	const {email,password}=req.body;
	if(!email ||!password){
		return res.status(422).json({error:"Please provide email or password"});
	}
	User.findOne({email:email})
	.then(savedUser=>{
		console.log(savedUser);
		if(!savedUser){
			return res.status(422).json({error:"Invalid Email or password"});
		}
		else{
		bcrypt.compare(password, savedUser.password)
		.then((match)=>{
			if(match){
			const token   = jwt.sign({_id:savedUser._id},JWT_SECRET);
			const {_id,name,email,followers,following,url} = savedUser;
			return res.json({token,user:{_id,name,email,followers,following,url}});
				//return res.json({message:"Successfully Sign in"});
			}
			return res.status(422).json({error:"Invalid Email or password"});
		})
		.catch(err=>{
			console.log(err);
			return res.status(500).json({error:"Internal server error"});
		})
		}
	})
})
router.post('/resetpassword',(req,res)=>{
	crypto.randomBytes(32,(err,buffer)=>{
		if(err){
		}
		const token  = buffer.toString("hex")
		User.findOne({email:req.body.email})
		.then(user=>{
			if(!user){
				return res.status(422).json({error:"User does not exist"});			
			}
			user.resetToken=token
			user.expireToken = Date.now()+3600000;
			user.save().then(result=>{
					transporter.sendMail({
						to:user.email,
						from:"no-reply@insta.com",
						subject:"Password Reset",
						html:`<div><p>You requested for password reset</p>
							<h5>Click on this <a href="http://localhost:3000/reset/${token}">link</a> to reset</h5></div>
							`
					})
					.then(resul=>{
					res.json({message:"Check your email"});			})
					.catch(err=>{
					console.log(err);
						res.status(500).json({message:"An error occured"});
					})
			})
		})	
	})
})
router.put('/changepassword',(req,res)=>{
		console.log(req.body);
		User.findOne({resetToken:req.body.token,expireToken:{$gt:Date.now()}})
		.then(result=>{
			if(result){
			bcrypt.hash(req.body.password,13).then(hashpass=>{
				result.password = hashpass;
				result.resetToken = undefined;
				result.expireToken = undefined;
				result.save().then(result1=>{
				return res.json("successfully resest");	
				})
			})
			}
			else{
			res.json({error:"User does not exist or session expired"});
		}
		})
})
router.post("/search",requireLogin,(req,res)=>{
	let userPattern = new RegExp("^"+req.body.query);
	User.find({email:{$regex:userPattern}})
	.select("_id email")
	.then(user=>{
		res.json({user})	
	})
	.catch(err=>{
		console.log(err);	
	})
})
module.exports = router;
