import React,{Component} from 'react';
import {Redirect,Link} from 'react-router-dom';
import M from 'materialize-css'
export default class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			data:[],
			text:"",
			user:JSON.parse(localStorage.getItem("user")),
			item:{likes:[],comments:[]}
		}	
		this.comment=this.comment.bind(this);
		this.textChange=this.textChange.bind(this);
		this.deletepost=this.deletepost.bind(this);
	}
	componentDidMount(){
		var elems = document.querySelectorAll('.modal');
   		 var instances = M.Modal.init(elems);
		console.log(this.props.l);
		if(this.props.l){
		const requestOptions = {
      				  method: 'GET',
      				  headers: { 'Content-Type': 'application/json',
      				  "Authorization":"Bearer "+localStorage.getItem("jwt") }
   	 };
		fetch(`http://localhost:5000/allpost`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				console.log(data.posts);
				this.setState({data:data.posts});	
			}
		})
		.catch(err=>{
			//console.log(err);		
		})	
		}
		else{
			//console.log();		
		}
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
				console.log(data);
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
			//console.log(err);		
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
			//console.log(err);		
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
				this.setState({data:newData});
				this.setState({text:""});	
			}
		})
		.catch(err=>{
			//console.log(err);		
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
			//console.log(err);		
		})	
	}
	render(){
		if(this.props.l){
		return<div className="home">
		<div id="modal2" className="modal" style={{color:"black"}}>
					
    				<div className="modal-content">
    				<h4>Likes By</h4>
      				<ul>{
      				this.state.item.likes.map((item,id)=>{
							return <li><Link id={id} to={item._id === this.state.user._id?'/profile':'/profile/'+item._id} style={{fontSize:"30px"}}>{item.name}</Link></li>
						})
						}
						</ul>			
      				
    				</div>
    				<div className="modal-footer">
      				<button className="modal-close waves-effect waves-green btn-flat">close</button>
    				</div>
 			 	</div>
 			 	<div id="modal3" className="modal" style={{color:"black"}}>
    				<div className="modal-content">
    				<h4>Commented By</h4>
      				<ul>{
      				this.state.item.comments.map((item,id)=>{
							return <li><span><Link id={id} to={item.postedBy._id === this.state.user._id?'/profile':'/profile/'+item.postedBy._id} style={{fontSize:"30px"}}>{item.postedBy.name}</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{fontSize:"18px"}}>{item.text}</span></span></li>
						})			
      				}
      				</ul>
    				</div>
    				<div className="modal-footer">
      				<button className="modal-close waves-effect waves-green btn-flat">close</button>
    				</div>
 			 	</div>
		{this.state.data.map((item,id)=>{return <div className="card home-card" key={id}>
				<div>
					<img style={{width:"30px", height:"30px", borderRadius:"15px", marginRight:"10px",marginTop:"8px",marginLeft:"6px"}} src={item.postedBy.url} alt=""/>
					<Link to={item.postedBy._id === this.state.user._id?'/profile':'/profile/'+item.postedBy._id} style={{fontSize:"30px"}}>{item.postedBy.name}</Link>
					
				<span >{item.postedBy._id===this.state.user._id? <i className="material-icons" style={{float:"right"}} onClick={()=>{this.deletepost(item._id)}}>delete</i>:<div/>}
		</span>	</div>
				<div className="card-image">
					<img src={item.photo} alt=""/>
				</div>
				<div className="card-content">
				  <i className="material-icons" style={{color:"red"}}>favorite</i>
				  {item.likes.some(id=> id._id === this.state.user._id)?<i className="material-icons" onClick={()=>{this.unlike(item._id)}}>thumb_down</i>:
				  <i className="material-icons" onClick={()=>{this.like(item._id)}}>thumb_up</i>
				  }
				  <br/>
				  <h6 class="waves-effect waves-light modal-trigger" data-target="modal2" onClick={()=>{this.setState({item:item})}}>{item.likes.length} likes</h6>
				  <h6>{item.title}</h6>
					
					<p>{item.body}</p>
					<h6 class="waves-effect waves-light modal-trigger" data-target="modal3" onClick={()=>{this.setState({item:item})}}>{item.comments.length} Comments</h6>
					<input type="text" value={this.state.text} onChange={this.textChange} placeholder="add a comment"/>
					{this.state.text===""?<span/>:<button onClick={()=>{this.comment(item._id)}}>Comment</button>}
				</div>	
				
			</div>
		})
		}
		
  </div>
          
	}
	else{
		return <Redirect to="/signin"/>	
	}
	}
}
