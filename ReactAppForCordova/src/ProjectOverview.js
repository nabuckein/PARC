import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';


class ProjectOverview extends Component {
  render() {
    return (
      <StyleRoot>
        <div className="projectOverviewContainer" style={styles.projectOverviewContainer}>
          <nav key="projectOverview1" style={styles.projectOverviewNav}>
              <h1 style={styles.projectOverviewNavTitle}>{this.props.projectOverviewTitle}</h1>
              <p key="project1PendingRedlines" style={styles.projectOverviewPendingRedlines}>X redlines need to be resolved</p>
              <p key="project1PendingParts" style={styles.projectOverviewPendingParts}>Y parts need to be ordered</p>
              <button key="project1ButtonRedline" style={styles.projectOverviewButtons}>SUBMIT NEW REDLINE</button>
              <button key="project1BbuttonPart" style={styles.projectOverviewButtons}>REQUEST A PART</button>
              <div className="iconsContainer" style={styles.iconsContainer}>
                <p key="icon1" style={styles.iconsCog}><i className="fas fa-cog fa-2x"></i></p>
                <p key="icon2" style={styles.iconsEnvelope}><i className="fas fa-envelope fa-2x" ></i></p>
                <p key="icon3" style={styles.iconsTrash}><i className="fas fa-trash-alt fa-2x" ></i></p>
              </div>
            </nav>
        </div>
      </StyleRoot>
    );
  }
}


export default ProjectOverview;

const styles = {
  
  projectOverviewContainer:{
    width:'100%'
  },
  projectOverviewNav:{
    marginLeft:10,
    marginRight:10,
    border:'solid transparent 2px',
    paddingTop:10,
    backgroundColor:'black',
    borderRadius:5,
    height:'auto',
    width:300,    
    textAlign:'center',
    ':hover':{
      border:'solid white 2px'
    }
  },
  projectOverviewNavTitle:{
    color:'white',
    fontFamily:'Fjalla One',
  },
  projectOverviewPendingRedlines:{
    color:'white',
    fontSize:14,
    fontFamily:'Fjalla One'
  },
  projectOverviewPendingParts:{
    color:'white',
    fontSize:14,
    fontFamily:'Fjalla One'
  },
  projectOverviewButtons:{
    backgroundColor:'darkblue',
    fontSize:16,
    fontFamily:'Rajdhani',
    color:'white',
    height:40,
    width:180,
    border:'none',
    borderRadius:'3px',
    marginBottom:10,
    marginLeft:5,
    marginRight:5,
    ':hover':{
      backgroundColor:'purple',
      color:'white'
    },
    ':active':{
      backgroundColor:'white',
      color:'darkblue'
    }
  },
  iconsContainer:{
    marginRight:'auto',
    marginLeft:'auto',
    marginTop:20,
    marginBottom:20,
    width:'60%',
    display:'flex',
    justifyContent:'space-around'
  },
  
  iconsCog:{
    
    color:'white',
    
    ':hover':{
      color:'yellow'
    }
  },
  iconsEnvelope:{
    color:'white',
    
    ':hover':{
      color:'green'
    }
  },
  iconsTrash:{
    color:'white',
    
    ':hover':{
      color:'red'
    }
  }
}