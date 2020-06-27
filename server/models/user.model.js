const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({

	name:{
		type:String
	},
	email:{
		type:String
	},
	password:{
		type:String
	}
})

const user=mongoose.model('login',userSchema);
module.exports=user;
