import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import M from 'materialize-css';
export default class CreatePost extends Component{
	constructor(props){
		super(props);
		this.state={
			title:"",
			body:"",
			image:"",
			url:""	
		}	
		
		this.titlechange=this.titlechange.bind(this);
		this.bodychange=this.bodychange.bind(this);
		this.imagechange=this.imagechange.bind(this);
		this.submit=this.submit.bind(this);
		this.upload=this.upload.bind(this);
	}
	upload(e){
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
      				  headers: { 'Content-Type': 'application/json',
      				  "Authorization":"Bearer "+localStorage.getItem("jwt") },
      				  body: JSON.stringify({url:this.state.url,
							title:this.state.title,
							body:this.state.body})
   	 };
		fetch(`http://localhost:5000/createpost`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				M.toast({html: 'Successfully created',classes:"#388e3c green darken-2"});
				window.location='/signin';	
			}
		})
		.catch(err=>{
			console.log(err);		
		})
		})
		.catch(err=>{console.log(err)});
	}
	titlechange(e){
		this.setState({title:e.target.value});	
	}
	bodychange(e){
		this.setState({body:e.target.value});	
	}
	imagechange(e){
		console.log(e.target.files[0]);
		this.setState({image:e.target.files[0]});	
	}
	submit(e){
		e.preventDefault();
		
	}
	render(){
		if(this.props.l){
		return(
			<div className="card input-field" style={{margin:"30px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}>
				<input type="text" placeholder="title" value={this.state.title} onChange={this.titlechange}/>
				<input type="text" placeholder="body" value={this.state.body} onChange={this.bodychange}/>
				<div className="file-field input-field">
   		   	<div className="btn #1e88e5 blue darken-1">
      			  <span>Upload Image</span>
      			  <input type="file" onChange={this.imagechange}/>
     		 		</div>
     		 			<div className="file-path-wrapper">
      	  			<input className="file-path validate" type="text"/>
      	  			
      			</div>
    			</div>
    			<button className="btn waves-effect waves-light #1e88e5 blue darken-1" type="submit" name="action">
    			<i className=" right #1e88e5 blue darken-1" onClick={this.upload}>Submit Post</i>
  				</button>
			</div>		
		)
		}
		else{
			return <Redirect to="/signin"/>		
		}	
	}
}