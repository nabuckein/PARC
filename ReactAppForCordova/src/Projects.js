import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import ProjectOverview from './ProjectOverview.js';
import Sidebar from './Sidebar.js';
import NewProject from './NewProject.js';
import ProjectStatus from './ProjectStatus.js';
import Message from './Message.js';

const firebase = require("firebase");
    // Required for side-effects
    

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectsNameArr: [],
      projectsIDArr: [],
      projectsUsersFullNameArr: [],
      componentToDisplay: this.props.componentToDisplay,
      currentProjectTitle:'none',
      currentProjectNumber:0,
      currentProjectTeamMembers:[],
      messageUser:'none'
    };
  }

  projectDeletedRerender=(e)=>{
    require("firebase/firestore");
    var db = firebase.firestore();
    var projectsNameArr = [];
    var projectsIDArr = [];
    
    //ALL USERS CAN SEE ALL PROJECTS APPROACH
    db.collection('projects').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            projectsNameArr.push(doc.data().projectName);
            projectsIDArr.push(doc.id);
        });
        this.setState({projectsNameArr : projectsNameArr, projectsIDArr: projectsIDArr});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
  }
 
  componentWillMount=(e)=>{
    require("firebase/firestore");
    var db = firebase.firestore();
    var projectsNameArr = [];
    var projectsIDArr = [];
    var projectsUsersFullNameArr = [];
    console.log(this.props.currentUser.email);
    //ALL USERS CAN SEE ALL PROJECTS APPROACH
    db.collection('projects').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            projectsNameArr.push(doc.data().projectName);
            projectsIDArr.push(doc.id);
            projectsUsersFullNameArr.push(doc.data().fullName);
        });
        this.setState({projectsNameArr: projectsNameArr, projectsIDArr: projectsIDArr, projectsUsersFullNameArr:projectsUsersFullNameArr});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
  }
  
    
  handleNewProjectSubmitButtonClick=(e)=>{  //PASS THIS TO NEW PROJECT COMPONENT AS A PROP IN ORDER TO BE ABLE TO GO BACK TO PROJECTS/SIDEBAR SCREEN
      var db = firebase.firestore();
      var projNameEl = document.getElementById('newProjectName');
      var projNumberEl = document.getElementById('newProjectID');
      if(projNumberEl.value !== "" && projNameEl.value !== ""){
        var projRef = db.collection('projects').doc(projNumberEl.value);
        var getDoc = projRef.get()
        .then(doc => {
          if(!doc.exists){
            projRef.set ({
              projectName: projNameEl.value,
              projectNumber: projNumberEl.value
            });
            console.log("ADDED: " + projNameEl.value + " " +  projNumberEl.value);
            this.setState({componentToDisplay:"Projects"});
          }else{
            var errorText = document.getElementById("newProjectErrorMessageText");
            // ...
            console.log("%cThis project already exists", "background-color: orange");      
            errorText.style.color = 'white';
          }
        
        }).catch(err =>{
          console.log('Error getting document', err);

        });
    }
  }
  handleAddNewProject=(e)=>{
    this.setState({componentToDisplay:'NewProject'});
  }
  handleCancelNewProject=(e)=>{
    this.setState({componentToDisplay:'Projects'});
  }
  toProjectStatus=(e)=>{
    //console.log(e.target.id); 
    require("firebase/firestore");   
    var projectIDOfElementClicked = e.target.id;
    var db = firebase.firestore();
    var dbRef = db.collection('projects').doc(projectIDOfElementClicked);
    dbRef.get().then(doc=>{
      this.setState({currentProjectTeamMembers: doc.data().team, componentToDisplay:"ProjectStatus", currentProjectNumber:doc.data().projectNumber, currentProjectTitle:doc.data().projectName});
    }).catch((err) => {
      console.log('Error getting documents', err);
    });
    
  }
  toMessage=(e)=>{
    console.log("MESSAGE button clicked!");
    var parentEl = e.target.parentNode
		var label = parentEl.getElementsByTagName('label');
		console.log(label[0].innerHTML);
    var x = e.target.id;
    this.setState({componentToDisplay: "Message", messageUser:label[0].innerHTML});
  }

  render() {
    var projects = [];
    var sidebar, newProject, projectStatus, message;

    if(this.state.componentToDisplay === 'Projects'){
      for(var n=0; n<=this.state.projectsNameArr.length-1; n++){
        //PASS TO 'PROJECT OVERVIEW' COMPONENT THE METHOD handleProjectClick FROM 'APP VIA prop toProjectStatus
        projects.push(<ProjectOverview toProjectStatus={this.toProjectStatus} key={"projectOverview"+n} reRenderAfterProjectDelete={this.projectDeletedRerender} projectOverviewTitle={this.state.projectsNameArr[n]} projectID={this.state.projectsIDArr[n]}/>);
      }
      sidebar = <Sidebar toNewProjects={this.handleAddNewProject}/>;      
    }
    else if(this.state.componentToDisplay ==='NewProject'){
      newProject = <NewProject currentUser={this.state.currentUser} backToProjects={this.handleCancelNewProject} handleNewProjectSubmitButtonClick={this.handleNewProjectSubmitButtonClick}/>;
    }
    else if(this.state.componentToDisplay ==='ProjectStatus'){
      projectStatus = <div style={styles.test}><ProjectStatus toMessage={this.toMessage} team={this.state.currentProjectTeamMembers} number={this.state.currentProjectNumber} title={this.state.currentProjectTitle}  currentUser={this.state.currentUser} backToProjects={this.handleCancelNewProject}/></div>;
    }
    else if(this.state.componentToDisplay ==='Message'){
      message = <div style={styles.messageDiv}><Message title={this.state.currentProjectTitle} number={this.state.currentProjectNumber} currentUser={this.state.messageUser} messageFrom={this.props.currentUser} backToProjects={this.handleCancelNewProject}/></div>;
    }
    return (
      <StyleRoot>
        <div className="Projects" style={styles.projectsContainer} >
          <div className="titleContainer" style={styles.projectsTitleContainer}>                 
              <h1 className="projectsMainTitle" style={styles.projectsMainTitle}>PROJECTS</h1>
          </div>
          <div className="projectsNavsContainer" style={styles.projectsNavsContainer} >
            {projects}
            {sidebar}
            {newProject}
            {projectStatus}
            {message}
          </div>
          
        </div>
      </StyleRoot>
    );
  }
}


export default Projects;

const styles = {
  projectsContainer:{
    width:'100%'
  },
  projectsTitleContainer:{
    width:'100%',
    textAlign:'center'
  },
  projectsMainTitle:{
    color:'white',
    fontFamily:'Fjalla One',
  },
  projectsNavsContainer:{
    display:'flex',
    width:'100%',
    justifyContent:'center',
    marginBottom:100
  },
  test:{
    width:'100%'
  },
  messageDiv:{
    width:'100%'
  }
  

}