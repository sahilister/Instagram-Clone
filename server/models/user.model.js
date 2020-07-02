const mongoose  = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({

	name:{
		type:String
	},
	email:{
		type:String
	},
	password:{
		type:String
	},
	followers:[{type:ObjectId,ref:"login"}],
	following:[{type:ObjectId,ref:"login"}]
})

const user=mongoose.model('login',userSchema);
module.exports=user;
