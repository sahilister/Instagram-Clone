import React,{Component} from 'react';
import M from 'materialize-css';
export default class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			email:""
		}
		this.emailchange=this.emailchange.bind(this);
		this.submit=this.submit.bind(this);
	}
	emailchange(e){
		this.setState({email:e.target.value});	
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
				email:this.state.email})
    };
	fetch(`http://localhost:5000/resetpassword`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				M.toast({html: 'Check  your email',classes:"#388e3c green darken-2"});
				window.location='/signin';
			}
		})
		.catch(err=>{
			console.log(err);		
		})
	}
	}
	render(){
		return<div class="mycard">
      <div className="card authcard input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="email" value={this.email} onChange={this.emailchange}/>
          <button className="btn waves-effect waves-light #1e88e5 blue darken-1" type="submit" name="action" onClick={this.submit}>
    <i className=" right #1e88e5 blue darken-1">Send Email</i>
  </button>
  </div>
		</div>
	}
}
