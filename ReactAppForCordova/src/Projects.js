import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import ProjectOverview from './ProjectOverview.js';


const firebase = require("firebase");
    // Required for side-effects
    

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectsNameArr: [],
      projectsID: []
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
            console.log(doc.id, '=>', doc.data().projectName);
            projectsNameArr.push(doc.data().projectName);
            projectsIDArr.push(doc.id);

        });
        this.setState({projectsNameArr : projectsNameArr, projectsID: projectsIDArr});
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
    //ALL USERS CAN SEE ALL PROJECTS APPROACH
    db.collection('projects').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data().projectName);
            projectsNameArr.push(doc.data().projectName);
            projectsIDArr.push(doc.id);

        });
        this.setState({projectsNameArr : projectsNameArr, projectsID: projectsIDArr});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
  }
  passToProjectStatus=(e)=>{
    //console.log(this);
    this.props.toProjectStatus();
  }
    

  

  render() {
    console.log(this.props.currentUser.email);
    
    var projects = [];
    
    for(var n=0; n<=this.state.projectsNameArr.length-1; n++){
      //PASS TO 'PROJECT OVERVIEW' COMPONENT THE METHOD handleProjectClick FROM 'APP VIA prop toProjectStatus
      projects.push(<ProjectOverview toProjectStatus={this.passToProjectStatus} key={"projectOverview"+n} reRenderAfterProjectDelete={this.projectDeletedRerender} projectOverviewTitle={this.state.projectsNameArr[n]} projectID={this.state.projectsID[n]}/>);
    }

    return (
      <StyleRoot>
        <div className="Projects" style={styles.projectsContainer} >
          <div className="titleContainer" style={styles.projectsTitleContainer}>                 
              <h1 className="projectsMainTitle" style={styles.projectsMainTitle}>PROJECTS</h1>
          </div>
          <div className="projectsNavsContainer" style={styles.projectsNavsContainer} >
            {projects}
            
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
    justifyContent:'center',
    marginBottom:100
  }
 

}