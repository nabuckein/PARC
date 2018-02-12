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
      projectsNameArr: []
    };
  }

 
  componentWillMount=(e)=>{
    require("firebase/firestore");
    var db = firebase.firestore();
    var projectsNameArr = [];
    //ALL USERS CAN SEE ALL PROJECTS APPROACH
    db.collection('projects').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data().projectName);
            projectsNameArr.push(doc.data().projectName);
            

        });
        this.setState({projectsNameArr : projectsNameArr});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });


    //ALL USERS CAN SEE ONLY THEIR PROJECTS APPROACH

    /*
    var currentUserFromDB = "";
    var currentUsersProjects = [];
    db.collection('users').get().then((snapshot)=>{
      snapshot.forEach((doc) => {
        
        if(this.props.currentUser.email === doc.data().email){
          currentUserFromDB = doc.data().email;
          currentUsersProjects.push(doc.data().userProjects);
          console.log(doc.data());
        }
        //console.log(currentUsersProjects);
      });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
    */

  }

  render() {
    console.log(this.props.currentUser.email);
    
    var projects = [];
    
    for(var n=0; n<=this.state.projectsNameArr.length-1; n++){
      projects.push(<ProjectOverview key={"projectOverview"+n} projectOverviewTitle={this.state.projectsNameArr[n]}/>);
    }

    return (
      <StyleRoot>
        <div className="Projects" style={styles.projectsContainer}>
          <div className="titleContainer" style={styles.projectsTitleContainer}>                 
              <h1 className="projectsMainTitle" style={styles.projectsMainTitle}>PROJECTS</h1>
          </div>
          <div className="projectsNavsContainer" style={styles.projectsNavsContainer}>
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