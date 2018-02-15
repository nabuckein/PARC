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


    // Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();
var pathReference = storage.ref('LinkxQuery.xml');


storageRef.child('LinkxQuery.xml').getDownloadURL().then(function(url) {
  // `url` is the download URL for 'images/stars.jpg'

  // This can be downloaded directly:
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function(event) {
    var blob = xhr.response;
  };
  xhr.open('GET', url);
  xhr.send();

  // Or inserted into an <img> element:
  console.log(xhr.response);
}).catch(function(error) {
  // Handle any errors
  console.log("ERROR %c" + error, "background:purple; color:white");
});


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
      projects.push(<ProjectOverview key={"projectOverview"+n} reRenderAfterProjectDelete={this.projectDeletedRerender} projectOverviewTitle={this.state.projectsNameArr[n]} projectID={this.state.projectsID[n]}/>);
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