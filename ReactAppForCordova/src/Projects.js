import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import ProjectOverview from './ProjectOverview.js';

var firebase = require("firebase");

class Projects extends Component {

  handleLogOut=(e)=>{
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("%cUSER HAS LOGGED OUT", "background-color:red; color:white");
    }).catch(function(error) {
      // An error happened.
      console.log("%cERROR WHILE TRYING TO LOG OUT", "background-color:red; color:white");
    });
  }

  render() {
    return (
      <StyleRoot>
        <div className="Projects" style={styles.projectsContainer}>
          <div className="titleContainer" style={styles.projectsTitleContainer}>                 
              <h1 className="projectsMainTitle" style={styles.projectsMainTitle}>PROJECTS</h1>
          </div>
          <div className="projectsNavsContainer" style={styles.projectsNavsContainer}>
            <ProjectOverview projectOverviewTitle="FL1 PRINTER"/>
            <ProjectOverview projectOverviewTitle="FL2 BARCODER"/>
          </div>
          <div className="projectsButtonsContainer" style={styles.projectsButtonsContainer}>

              {/*<button key="button1" style={styles.projectsButtons}>SUBMIT</button>*/}
              <button key="button2" style={styles.projectsButtons} onClick={this.handleLogOut}>LOG OUT</button>
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
  },
  projectsButtonsContainer:{
    display:'flex',
    justifyContent:'center'
  },
  projectsButtons:{
    backgroundColor:'white',
    border:'none',
    borderRadius:5,
    paddingLeft:15,
    paddingRight:15,
    fontFamily:'Fjalla One',
    fontSize:30,
    marginLeft:10,
    marginRight:10,
    ':hover':{
      backgroundColor:'red',      
    },
    ':active':{
      backgroundColor:'red',
      color:'white'
    }      
  }

}