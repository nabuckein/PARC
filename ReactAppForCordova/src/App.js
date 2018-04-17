import React, { Component } from 'react';
import Projects from './Projects.js';
import Login from './Login.js';
import Sidebar from './Sidebar.js';
import NewProject from './NewProject.js';
import ProjectStatus from './ProjectStatus.js';
import LoginOrSignup from './LoginOrSignup.js';
import Signup from './Signup.js';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require('firebase');


class App extends Component {

  state={
    currentUser:null,
    currentUserEmail:null,
    componentToDisplay:"Projects"
  }
  componentWillMount=(e)=>{   
    
    var config = {
            apiKey: "AIzaSyDz7DCKOfgpVY5XWyy6KG4eLp-PMGF_KEk",
            authDomain: "baxter-parc.firebaseapp.com",
            databaseURL: "https://baxter-parc.firebaseio.com",
            projectId: "baxter-parc",
            storageBucket: "gs://baxter-parc.appspot.com",
            messagingSenderId: "712498374479"
          };
    firebase.initializeApp(config);
    this.firebaseUserSignedInFunction();
  }

  firebaseUserSignedInFunction=(e)=>{
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        // User is signed in.
        console.log("%cCURRENT USER'S E-MAIL: " + user.email, "background: blue; color:white");
        console.log("%cCURRENT USER'S DISPLAY NAME: " + user.displayName, "background: orange; color:black");        
        this.setState({currentUser:user, componentToDisplay: "Projects"});
      } 
      else {
        // No user is signed in.
        console.log("%cNO USER SIGNED IN" , "background: blue; color:white");
        this.setState({currentUser:null});
      }
    });
  }

  

  handleCancelNewProject=(e)=>{ //METHOD TO SWITCH SCREEN TO 'PROJECTS' SCREEN
    this.setState({componentToDisplay:"Projects"});
  }
  handleCancelLoginClick=(e)=>{
    this.setState({componentToDisplay:"LoginOrSignup"});
  }
  handleCancelSignupClick=(e)=>{
    this.setState({componentToDisplay:"LoginOrSignup"});
  }
  toLogin=(e)=>{
    this.setState({componentToDisplay:"Login"});
  }
  toSignup=(e)=>{
    this.setState({componentToDisplay:"Signup"});
  }

  render() {
    if (this.state.currentUser!== null && this.state.componentToDisplay === "Projects"){      
      return (
        <StyleRoot>
          <div className="App" style={styles.appContainer}>        
            <div className="projectsAndSidebarContainer" style={styles.projectsAndSidebarContainer}>
              <div className="projectsComponent" style={styles.projectsComponent}>
                <Projects currentUser={this.state.currentUser} toProjectStatus={this.handleProjectClick} componentToDisplay={this.state.componentToDisplay}/>
              </div>
              
            </div>
          </div>
        </StyleRoot>
      );
    }

    else if(this.state.currentUser=== null && this.state.componentToDisplay === "Login"){
      return(
        <div className="App" style={styles.appContainer}> 
          <div className="projectsContainer">
            <Login handleCancelLoginClick={this.handleCancelLoginClick}/>
          </div>
        </div>
      );
    }
    else if(this.state.currentUser=== null && this.state.componentToDisplay === "Signup"){
      return(
        <div className="App" style={styles.appContainer}> 
          <div className="projectsContainer">
            <Signup handleCancelSignupClick={this.handleCancelSignupClick}/>
          </div>
        </div>
      );
    }

    else if(this.state.currentUser=== null){ //IF I ADD this.state.componentToDisplay === "LoginOrSignup" IT GIVES ME AN ERROR      
      return(
        <div className="App" style={styles.appContainer}> 
          <div className="projectsContainer">
            <LoginOrSignup toLogin={this.toLogin} toSignup={this.toSignup}/>
          </div>
        </div>
      );
    }


    
  }
}


export default App;

const styles = {
  
  projectsAndSidebarContainer:{
    width:'100%',
    display:'flex',    
    justifyContent:'center',
    
  },
  projectsComponent:{
    width:'100%',
  },
  sidebar:{
    width:'20%'
  }
  
}