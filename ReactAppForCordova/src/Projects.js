import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import ProjectOverview from './ProjectOverview.js';

class Projects extends Component {
  render() {
    return (
      <StyleRoot>
        <div className="Projects" style={styles.projectsContainer}>
          <div className="titleContainer" style={styles.projectsTitleContainer}>                 
              <h1 className="projectsMainTitle" style={styles.projectsMainTitle}>PROJECTS</h1>
          </div>
          <div className="projectsNavsContainer" style={styles.projectsNavsContainer}>
            <ProjectOverview projectOverviewTitle="FL1 PRINTER"/>
            <ProjectOverview projectOverviewTitle="FL2 BAaER"/>
          </div>
          {/*<div className="projectsButtonsContainer" style={styles.projectsButtonsContainer}>

              <button key="button1" style={styles.projectsButtons}>SUBMIT</button>
              <button key="button2" style={styles.projectsButtons}>CANCEL</button>
          </div>*/}
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