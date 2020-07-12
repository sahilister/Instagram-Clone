import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import M from 'materialize-css';

// sendgrid api key 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
export default class SignUp extends Component{
	
	constructor(props){
		super(props);
		var l=true;
		if(!localStorage.getItem('jwt')){
			l=false;		
		}	
		this.state={
			name:"",
			email:"",
			password:"",l,
			image:"",
			url:""	
		}
		this.namechange=this.namechange.bind(this);
		this.emailchange=this.emailchange.bind(this);
		this.passwordchange=this.passwordchange.bind(this);
		this.submit=this.submit.bind(this);
		this.imagechange=this.imagechange.bind(this);
	}
	imagechange(e){
		this.setState({image:e.target.files[0]});	
	}
	namechange(e){
		this.setState({name:e.target.value});
	}
	emailchange(e){
		this.setState({email:e.target.value});	
	}
	passwordchange(e){
		this.setState({password:e.target.value});	
	}
	submit(e){
	e.preventDefault();
	if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)){
			M.toast({html: 'Invalid email address',classes:'#c62828 red darken-3'})	
	}
	else{
		if(this.state.image){
		const data = new FormData()
		data.append("file",this.state.image);
		data.append("upload_preset","InstramClone");
		data.append("cloud_name","instagram-image");
		fetch("https://api.cloudinary.com/v1_1/instagram-image/image/upload",{
			method:"POST",
			body:data		
		})	
		.then(res=>res.json())
		.then(data=>{
			console.log(data.url);
			this.setState({url:data.url});	
			const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name:this.state.name,
				password:this.state.password,
				email:this.state.email,
				url:this.state.url})
    };
	fetch(`http://localhost:5000/signup`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				M.toast({html: data.message,classes:"#388e3c green darken-2"});
				window.location='/signin';	
			}
		})
		.catch(err=>{
			console.log(err);		
		})
		})
		.catch(err=>{console.log(err)});
	
	}
	else{
		const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name:this.state.name,
				password:this.state.password,
				email:this.state.email,
				url:this.state.url})
    };
	fetch(`http://localhost:5000/signup`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				M.toast({html: data.message,classes:"#388e3c green darken-2"});
				window.location='/signin';	
			}
		})
		.catch(err=>{
			console.log(err);		
		})		
}
}
	}
	render(){
		if(!this.state.l){
		return<div class="mycard">
      <div className="card authcard input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="Name" value={this.state.name} onChange={this.namechange}/>
        <input type="text" placeholder="Email" value={this.state.email} onChange={this.emailchange}/>
        <input type="text" placeholder="Password" value={this.state.value} onChange={this.passwordchange}/>
        <div className="file-field input-field">
   	   	<div className="btn #1e88e5 blue darken-1">
      		  <span>Upload Image</span>
      		  <input type="file" onChange={this.imagechange}/>
     	 		</div>
     	 			<div className="file-path-wrapper">
        			<input className="file-path validate" type="text"/>
      		</div>
    	</div>
          <button className="btn waves-effect waves-light #1e88e5 blue darken-1" type="submit" name="action" onClick={this.submit}>
    <i className=" right #1e88e5 blue darken-1">Signup</i>
  </button>
  <h5>
  <Link to="/signin">Already have an account ?</Link>
  </h5>
  </div>
		</div>
	}
	else{
		return <Redirect to="/"/>	
	}
	}
}
