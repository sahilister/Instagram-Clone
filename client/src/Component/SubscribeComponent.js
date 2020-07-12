import React,{Component} from 'react';
import {Redirect,Link} from 'react-router-dom';
export default class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			data:[],
			text:"",
			user:JSON.parse(localStorage.getItem("user"))
		}	
		this.comment=this.comment.bind(this);
		this.textChange=this.textChange.bind(this);
		this.deletepost=this.deletepost.bind(this);
	}
	componentDidMount(){
		const requestOptions = {
      				  method: 'GET',
      				  headers: { 'Content-Type': 'application/json',
      				  "Authorization":"Bearer "+localStorage.getItem("jwt") }
   	 };
		fetch(`http://localhost:5000/getsubpost`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				//M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				this.setState({data:data.posts});	
			}
		})
		.catch(err=>{
			console.log(err);		
		})	
	}
	textChange(e){
	this.setState({text:e.target.value});
	}
	like(id){
		const requestOptions = {
      				  method: 'PUT',
      				  headers: { 'Content-Type': 'application/json',
      				  "Authorization":"Bearer "+localStorage.getItem("jwt") },
      				  body:JSON.stringify({postId:id})
   	 };
		fetch(`http://localhost:5000/like`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				//M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				console.log(data.posts);
				const newData = this.state.data.map(item=>{
					if(item._id === data.posts._id){
							return data.posts;						
						}				
						else {
							return item;
						}
				})
				console.log(newData);
				this.setState({data:newData});
			}
		})
		.catch(err=>{
			console.log(err);		
		})	
	}
	
	unlike(id){
		const requestOptions = {
      				  method: 'PUT',
      				  headers: { 'Content-Type': 'application/json',
      				  "Authorization":"Bearer "+localStorage.getItem("jwt")},
      				  body:JSON.stringify({postId:id} )
   	 };
		fetch(`http://localhost:5000/unlike`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				//M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				const newData = this.state.data.map(item=>{
					if(item._id === data.posts._id){
							return data.posts;						
						}				
						else {
							return item;
						}
				})
				this.setState({data:newData});	
			}
		})
		.catch(err=>{
			console.log(err);		
		})	
	}
	comment(id){
		
	const requestOptions = {
      				  method: 'PUT',
      				  headers: { 'Content-Type': 'application/json',
      				  "Authorization":"Bearer "+localStorage.getItem("jwt")},
      				  body:JSON.stringify({postId:id,text:this.state.text} )
   	 };
		fetch(`http://localhost:5000/comment`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				//M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				const newData = this.state.data.map(item=>{
					if(item._id === data.posts._id){
							return data.posts;						
						}				
						else {
							return item;
						}
				})
				console.log(newData);
				this.setState({data:newData});	
			}
		})
		.catch(err=>{
			console.log(err);		
		})	
	}
	deletepost(postid){
			const requestOptions = {
      				  method: 'DELETE',
      				  headers: { 'Content-Type': 'application/json',
      				  "Authorization":"Bearer "+localStorage.getItem("jwt")} };
		fetch(`http://localhost:5000/deletepost/${postid}`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				//M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				console.log(data);
				const newData = this.state.data.filter(item=>{
					return item._id !== data.result._id
				})
				this.setState({data:newData});	
			}
		})
		.catch(err=>{
			console.log(err);		
		})	
	}
	render(){
		if(this.props.l){
		return<div className="home">
		{this.state.data.map((item,id)=>{return <div className="card home-card" key={id}>
				<h5><Link to={item.postedBy._id==this.state.user._id?'/profile':'/profile/'+item.postedBy._id}>{item.postedBy.name}</Link>
				{item.postedBy._id===this.state.user._id? <i className="material-icons" style={{float:"right"}} onClick={()=>{this.deletepost(item._id)}}>delete</i>:<div/>}
				  </h5>
				<div className="card-image">
					<img src={item.photo} alt=""/>
				</div>
				<div className="card-content">
				  <i className="material-icons" style={{color:"red"}}>favorite</i>
				  {item.likes.includes(this.state.user._id)?<i className="material-icons" onClick={()=>{this.unlike(item._id)}}>thumb_down</i>:
				  <i className="material-icons" onClick={()=>{this.like(item._id)}}>thumb_up</i>
				  }<h6>{item.likes.length} likes</h6>
					<h6>{item.title}</h6>
					<p>{item.body}</p>
					{
						item.comments.map((record,id)=>{
							return <h6 key={id}><span><b>{record.postedBy.name}</b> {record.text}</span></h6>						
						})					
					}
					<input type="text" value={this.state.text} onChange={this.textChange} placeholder="add a comment"/>
					<button onClick={()=>{this.comment(item._id)}}>Comment</button>
				</div>			
			</div>
		})
		}
		</div>
	}
	else{
		return <Redirect to="/"/>	
	}
	}
}
