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
	postedBy:{
		type:ObjectId,
		ref:"User"
	}
})

const post = mongoose.model("post",postSchema);

module.exports = post;
