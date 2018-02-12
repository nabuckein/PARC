import React, { Component } from 'react';
import Projects from './Projects.js';
import Login from './Login.js';
import Sidebar from './Sidebar.js';
import NewProject from './NewProject.js';
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
            storageBucket: "",
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
        
        this.setState({currentUser:user});
      } 
      else {
        // No user is signed in.
        console.log("%cNO USER SIGNED IN" , "background: blue; color:white");
        this.setState({currentUser:null});
      }
    });
  }

  handleNewProjectSubmitButtonClick=(e)=>{  //PASS THIS TO NEW PROJECT COMPONENT AS A PROP IN ORDER TO BE ABLE TO GO BACK TO PROJECTS/SIDEBAR SCREEN
      var db = firebase.firestore();
      var a = this;
      var projNameEl = document.getElementById('newProjectName');
      var projNumberEl = document.getElementById('newProjectID');
      if(projNumberEl.value !== "" && projNameEl.value !== ""){
        db.collection('projects').add({
          projectName: projNameEl.value,
          projectNumber: projNumberEl.value
        });
        console.log("ADDED: " + projNameEl.value + " " +  projNumberEl.value);
        this.setState({componentToDisplay:"Projects"});
        
      }
    }

  handleCancelNewProject=(e)=>{
    this.setState({componentToDisplay:"Projects"});
  }
  handleAddNewProject=(e)=>{
    this.setState({componentToDisplay:"NewProject"})
  }
  
  render() {
    
    

    if (this.state.currentUser!== null && this.state.componentToDisplay === "Projects"){
      
      return (
        <StyleRoot>
          <div className="App" style={styles.appContainer}>        
            <div className="projectsAndSidebarContainer" style={styles.projectsAndSidebarContainer}>
              <div className="projectsComponent" style={styles.projectsComponent}>
                <Projects currentUser={this.state.currentUser} />
              </div>
              <div className="sidebarComponent" style={styles.sidebar}>
                <Sidebar toNewProjects={this.handleAddNewProject}/>
              </div>
            </div>
          </div>
        </StyleRoot>
      );
    }

    else if(this.state.currentUser!== null && this.state.componentToDisplay === "NewProject"){
      return (
        <StyleRoot>
          <div className="App" style={styles.appContainer}>        
            <div className="projectsAndSidebarContainer" style={styles.projectsAndSidebarContainer}>
              <div className="projectsComponent" style={styles.projectsComponent}>
                <NewProject currentUser={this.state.currentUser} backToProjects={this.handleCancelNewProject} handleNewProjectSubmitButtonClick={this.handleNewProjectSubmitButtonClick}/>
              </div>
              
            </div>
          </div>
        </StyleRoot>
      );      
    }

    else{      
      return(
        <div className="App" style={styles.appContainer}> 
          <div className="projectsContainer">
            <Login/>
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
    width:'80%',
  },
  sidebar:{
    width:'20%'
  }
  
}