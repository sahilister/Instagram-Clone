const mongoose =require('mongoose');
const {ObjectId} = mongoose.Schema.Types; 
const postSchema = new mongoose.Schema({

	title:{
		type:String
	},
	body:{
		type:String
	},
	photo:{
		type:String
	},
	likes:[{
		type:ObjectId,ref:"login"
	}],
	comments:[{
		text:String,
		postedBy:{type:ObjectId,ref:"login"}	
	}],
	postedBy:{
		type:ObjectId,
		ref:"login"
	}
})

const post = mongoose.model("post",postSchema);

module.exports = post;
