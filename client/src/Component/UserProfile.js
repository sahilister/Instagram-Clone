import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
export default class Signup extends Component{
	constructor(props){
		super(props);
		this.state={
			data:{
				user:{
				    email:"",
				    name:"",
				    followers:[],
				    following:[]
				},
				post:[
				
				]				
			},
			user:JSON.parse(localStorage.getItem("user")),
			id:window.location.pathname.split("/")[2]	
		}	
		this.follow=this.follow.bind(this);
		this.unfollow=this.unfollow.bind(this);
	}
	componentDidMount(){
		const requestOptions = {
      				  method: 'GET',
      				  headers: { 'Content-Type': 'application/json',
      				  "Authorization":"Bearer "+localStorage.getItem("jwt")}
   	 };
		fetch(`http://localhost:5000/user/${this.state.id}`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				//M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				console.log(data);
				console.log(this.state.id);
				this.setState({data:data});
			}
		})
		.catch(err=>{
			console.log(err);		
		})		
	}
	follow(){
			const requestOptions = {
      				  method: 'PUT',
      				  headers: { 'Content-Type': 'application/json',
      				  "Authorization":"Bearer "+localStorage.getItem("jwt")},
      				  body:JSON.stringify({followId:this.state.id})
   	 };
		fetch(`http://localhost:5000/follow`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				//M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				console.log(data);
				var dat = this.state.data;
				dat.user = data;
				this.setState({data:dat});
				var user=this.state.user;
				user.following.push(this.state.id);
				localStorage.setItem("user",JSON.stringify({name:user.name,email:user.email, _id:user._id, followers:user.followers, following:user.following}))
				 // updating only data.user detail so that user can see detail of another user
			}
		})
		.catch(err=>{
			console.log(err);		
		})		
	}
	unfollow(){
			const requestOptions = {
      				  method: 'PUT',
      				  headers: { 'Content-Type': 'application/json',
      				  "Authorization":"Bearer "+localStorage.getItem("jwt")},
      				  body:JSON.stringify({unfollowId:this.state.id})
   	 };
		fetch(`http://localhost:5000/unfollow`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				//M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				console.log(data);
				var dat = this.state.data;
				dat.user = data;
				this.setState({data:dat}); // updating only data.user detail so that user can see detail of another user
				//localStorage.setItem("user",JSON.stringify({_id:data._id,email:data.email,name:data.name,followers:data.followers,following:data.following}))
				
			}
		})
		.catch(err=>{
			console.log(err);		
		})		
	}
	render(){
		if(this.props.l){
		return <div style={{maxWidth:"1250px" ,margin:"0px auto"}}> 
		<div style={{ display:"flex",justifyContent:"space-around",margin:"18px 0px",borderBottom:"2px solid grey"}}>
				<div  >
					<img style={{width:"160px", height:"160px", borderRadius:"80px"}} src="https://images.unsplash.com/photo-1485528562718-2ae1c8419ae2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
				</div>
				<div>
					<h4>{this.state.data.user.name}</h4>
					<h4>{this.state.data.user.email}</h4>
					<div style={{display:"flex",justifyContent:"space-around",width:"108%"}}>
						<h6>{this.state.data.post.length} posts</h6>
						<h6>{this.state.data.user.followers.length} followers</h6>
						<h6>{this.state.data.user.following.length} following </h6>
						<button className="btn waves-effect waves-light #1e88e5 blue darken-1" type="submit" name="action" onClick={this.follow}>
    <i className=" right #1e88e5 blue darken-1">Follow</i>
  </button>
  <button className="btn waves-effect waves-light #1e88e5 blue darken-1" type="submit" name="action" onClick={this.unfollow}>
    <i className=" right #1e88e5 blue darken-1">Unfollow</i>
  </button>
					</div>
				</div>
			</div>
			<div className="galary">
				{this.state.data.post.map((item, id)=>{
					return <img key={id} className="item" src={item.photo} alt=""/>				
				})}
				</div>
		</div>
		}
		else{
			return <Redirect to="/signin"/>		
		}
	}
}
