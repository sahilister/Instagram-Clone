import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import M from 'materialize-css';
export default class Signup extends Component{
	constructor(props){
		super(props);
		this.state={
			data:[],
			url:"",
			user:JSON.parse(localStorage.getItem("user"))	
		}	
		console.log(this.state.user);
		//this.updatephoto = this.updatephoto.bind(this);
		this.imagechange=this.imagechange.bind(this);
	}
	imagechange(e){
		const data = new FormData()
		data.append("file",e.target.files[0]);
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
        	method: 'PUT',
        	headers: { 'Content-Type': 'application/json',
      				  "Authorization":"Bearer "+localStorage.getItem("jwt") },
        	body: JSON.stringify({
					url:this.state.url})
   	 };
		fetch(`http://localhost:5000/uploadpic`,requestOptions)
			.then(res=>res.json())
			.then(data=>{
				if(data.error){
					M.toast({html: "An error occured while uploading the pic",classes:'#c62828 red darken-3'})			
				}	
				else{
					M.toast({html: "pic uploaded successfully",classes:"#388e3c green darken-2"});
					console.log(data);
					localStorage.setItem("user",JSON.stringify({name:this.state.user.name,email:this.state.user.email, _id:this.state.user._id, followers:this.state.user.followers, following:this.state.user.following,url:data.url}))
					this.setState({url:data.url});
				}
		})
		.catch(err=>{
			console.log(err);		
		})		
		})
		.catch(err=>{
	})
	}
	componentDidMount(){
		const requestOptions = {
      				  method: 'GET',
      				  headers: { 'Content-Type': 'application/json',
      				  "Authorization":"Bearer "+localStorage.getItem("jwt") }
   	 };
		fetch(`http://localhost:5000/mypost`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				//M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				console.log(data);
				this.setState({data:data.mypost});	
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
				<div  style={{display:"flex",flexDirection:"column"}}>
					<img style={{width:"160px", height:"160px", borderRadius:"80px"}} src={this.state.user.url} alt=""/>
				 <div className="file-field input-field">
   	   		<div className="btn #1e88e5 blue darken-1">
      			  <span>Upload Image</span>
      			  <input type="file" onChange={this.imagechange}/>
     	 			</div>
     	 			<div className="file-path-wrapper">
        				<input className="file-path validate" type="text"/>
      			</div>
    	   	 </div>	
				</div>
				<div>
					<h4>{this.state.user.name}</h4>
					<h4>{this.state.user.email}</h4>
					<div style={{display:"flex",justifyContent:"space-around",width:"108%"}}>
						<h6>{this.state.data.length} posts</h6>
						{console.log(this.state.user)}
						<h6>{this.state.user.followers.length} followers</h6>
						<h6>{this.state.user.following.length} following </h6>
					</div>
				</div>
			</div>
			<div className="galary">
				{this.state.data.map((item, id)=>{
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
