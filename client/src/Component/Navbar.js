import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import M from 'materialize-css'
export default class Navbar extends Component{
	constructor(){
		super();
		this.state={
			search:"",
			user:[]
		}
		this.search=this.search.bind(this);
	}
	search(e){
		this.setState({search:e.target.value});
		const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
      				  "Authorization":"Bearer "+localStorage.getItem("jwt") },
        body: JSON.stringify({
        	query:e.target.value
        })
    };
	fetch(`http://localhost:5000/search`,requestOptions)
		.then(res=>res.json())
		.then(data=>{
			if(data.error){
				//M.toast({html: data.error,classes:'#c62828 red darken-3'})			
			}	
			else{
				this.setState({user:data.user});
			}
		})
		.catch(err=>{
			console.log(err);		
		})		
	}
	componentDidMount(){
		 var elems = document.querySelectorAll('.modal');
   		 var instances = M.Modal.init(elems);
	}
	render(){
		if(this.props.l){
		return <div>
		<nav>
    			<div className="nav-wrapper white">
      			<Link to="/" className="brand-logo left">Instagram</Link>
      			<ul id="nav-mobile" className="right hide-on-down">
        		<li><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>
        		<li><Link to="/profile">Profile</Link></li>
      		<li><Link to="/create">Create Post</Link></li>
      		<li><Link to="mysubpost">My following </Link></li>
      		<li> <button className="btn waves-effect waves-light #1e88e5 red darken-1 hide-on-down" type="submit" name="action" onClick={()=>{
		localStorage.clear();
		this.props.change1();
    }}>
    Logout
  </button></li>
      		</ul>
    			</div>
    			  <div id="modal1" className="modal" style={{color:"black"}}>
    <div className="modal-content">
      <input type="text" placeholder="Search User" value={this.state.search} onChange={this.search}/>
      
    <ul className="collection">
    {this.state.user.map((item,id)=>{
    	return <div className={id}>
    	<Link to={'/profile/'+item._id}><li className="collection-item">{item.email}</li></Link>
    		</div>
    	
    })}
    </ul>
    </div>
    <div className="modal-footer">
      <button className="modal-close waves-effect waves-green btn-flat">close</button>
    </div>
  </div>
 
  			</nav>
			 
		</div>
	}
	else {
			return <div>
		<nav>
    			<div className="nav-wrapper white">
      			<Link to='/signin' className="brand-logo left">Instagram</Link>
      			<ul id="nav-mobile" className="right hide-on-down">
     			   <li><Link to="/signin">Login</Link></li>
        		<li><Link to="/Signup">Signup</Link></li>
      		</ul>
    			</div>
  			</nav> 
		</div>
	}
	}
}
/*
profile
create post
*/
