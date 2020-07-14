import React,{Component} from 'react';
import './App.css';
import Navbar from './Component/Navbar';
import {BrowserRouter,Route} from 'react-router-dom';
import Login from './Component/Login.js';
import Signup from './Component/Signup';
import Home from './Component/Home';
import Profile from './Component/Profile';
import CreatePost from './Component/createPost';
import UserProfile from './Component/UserProfile';
import Reset from './Component/reset';
import Forgot from './Component/forgotpassword';
import Myfollowers from './Component/SubscribeComponent';
class App extends Component{
	constructor(props){
		super(props);	
		this.state={
			l:localStorage.getItem("jwt")?true:false		
		}
		this.change=this.change.bind(this);
		this.change1=this.change1.bind(this);
	}
	change(){
		this.setState({l:true});	
	}
	change1(){
		this.setState({l:false});
		window.location = '/signin';	
	}
  render(){
  	return (
    <div className="App">
    
    <BrowserRouter>
    	<Navbar l={this.state.l} change={this.change} change1={this.change1}/>
      <Route exact path="/"><Home l={this.state.l} change={this.change} change1={this.change1}/> </Route>
      <Route exact path="/signin"><Login l={this.state.l} change={this.change} change1={this.change1}/></Route>
      <Route exact path="/signup"><Signup l={this.state.l} change={this.change} change1={this.change1}/></Route>
      <Route exact path="/profile"><Profile l={this.state.l} change={this.change} change1={this.change1}/></Route>
      <Route exact path="/profile/:userid"><UserProfile l={this.state.l} change={this.change} change1={this.change1}/></Route>
      <Route exact path="/create"><CreatePost l={this.state.l} change={this.change} change1={this.change1}/></Route>	
      <Route exact path="/mysubpost"><Myfollowers l={this.state.l} change={this.change} change1={this.change1}/></Route>
      <Route exact path="/reset"><Reset/></Route>
      <Route exact path="/reset/:token"><Forgot/></Route>
    </BrowserRouter>
    </div>
  );}
}

export default App;
