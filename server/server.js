const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose=require('mongoose');

const cors = require('cors');
app.use(cors());
const {MONGOURI} = require('./keys');
//Sahil@1234
require('./models/user.model')
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || MONGOURI,{useNewUrlParser:true, useCreateIndex:true,useUnifiedTopology:true, useFindAndModify: false });
const connection=mongoose.connection;
connection.once('open',()=>{
console.log('database successfully connected');
})

connection.once('error',()=>{
	console.log('An error occured');
})
//if(process.env.NODE_ENV === 'production'){

	app.use(express.static('./build'));
//}
app.use(require('./routes/user.routes'));
app.use(require('./routes/post.routes'));
app.use(require('./routes/user1.routes'));
app.listen(PORT,()=>{
	console.log('server is running at PORT 5000');
})
