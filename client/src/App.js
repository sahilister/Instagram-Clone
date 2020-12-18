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

export default App;/*
import React, { Component } from 'react';
 
class App extends Component {
 
    componentDidMount() {
        this.googleSDK();
        console.log('sfsfd');
    }
 
    prepareLoginButton = () => {
 
    console.log(this.refs.googleLoginBtn);
 
    this.auth2.attachClickHandler(this.refs.googleLoginBtn, {},
        (googleUser) => {
 
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
 
 
        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });
 
    }
 
    googleSDK = () => {
 
        window['googleSDKLoaded'] = () => {
          window['gapi'].load('auth2', () => {
            this.auth2 = window['gapi'].auth2.init({
              client_id: '764194037935-hkai71dhmgitqvsmv7alnj7ivcab3fvt.apps.googleusercontent.com',
              cookiepolicy: 'single_host_origin',
              scope: 'profile email'
            });
            this.prepareLoginButton();
          });
        }
     
        (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));
     
    }
   
    render() {
 
        return (
            <div className="row mt-5">  
                <div className="col-md-12">
                    <h2 className="text-left">Google Login Demo</h2>
                    <div className="card mt-3">
                        <div className="card-body">
                             
                            <div className="row mt-5 mb-5">
                                <div className="col-md-4 mt-2 m-auto ">
                                    <button className="loginBtn loginBtn--google" ref="googleLoginBtn">
                                        Login with Google
                                    </button>
                                </div>    
                            </div>
                         
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default App;*/
