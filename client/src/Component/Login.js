import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import M from 'materialize-css';
export default class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			email:"",
			password:""		
		}
		this.emailchange=this.emailchange.bind(this);
		this.passwordchange=this.passwordchange.bind(this);
		this.submit=this.submit.bind(this);
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
	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
				password:this.state.password,
				email:this.state.email})
    };
	fetch(`http://localhost:5000/signin`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				M.toast({html: 'Signin Successfully',classes:"#388e3c green darken-2"});
				this.props.change();
				localStorage.setItem("jwt",data.token);
				console.log(data.user);
				localStorage.setItem("user",JSON.stringify(data.user));
				window.location='/';
			}
		})
		.catch(err=>{
			//console.log(err);		
		})
	}
	}
	render(){
		if(!this.props.l){
		return<div class="mycard">
      <div className="card authcard input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="Email" value={this.state.email} onChange={this.emailchange}/>
        <input type="text" placeholder="Password" value={this.password} onChange={this.passwordchange}/>
        <div className="forgot">
        	<span>
        			<Link to = "/reset" className="password">forgot password ?</Link>
        	</span>
         <button className="btn waves-effect waves-light #1e88e5 blue darken-1" type="submit" name="action" onClick={this.submit}>
    			<i className=" right #1e88e5 blue darken-1">Login</i>
  			</button>
  		</div>
   	 <h5>
  			<Link to="/signup">Don't have an account ?</Link>
  		 </h5>
     </div>
		</div>
	}
	else{
		return <Redirect to="/"/>	
	}
	}
}
