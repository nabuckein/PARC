import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class Sidebar extends Component {
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
        <div className="Sidebar" style={styles.Sidebar}>
          <div className="sidebarTitleContainer" style={styles.sidebarTitleContainer}>                 
              <h1 className="sidebarMainTitle" style={styles.sidebarMainTitle}>Sidebar</h1>
              <div className="sideBarButtonsContainer" style={styles.projectsButtonsContainer}>

                <button key="button1" style={styles.sideBarButtons}>SUBMIT</button>
                <button key="button2" style={styles.sideBarButtons} onClick={this.handleLogOut}>LOG OUT</button>
              </div>
          </div>
          
        </div>
      </StyleRoot>
    );
  }
}


export default Sidebar;

const styles = {
  Sidebar:{
    textAlign:'center'
  },
  sidebarTitleContainer:{    
    textAlign:'center'
  },
  sidebarMainTitle:{
    color:'white',
    fontFamily:'Fjalla One',
  },
  sideBarButtonsContainer:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'center'
  },
  sideBarButtons:{
    width:200,
    backgroundColor:'white',
    border:'none',
    borderRadius:5,
    paddingLeft:15,
    paddingRight:15,
    fontFamily:'Fjalla One',
    fontSize:30,
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
    ':hover':{
      backgroundColor:'red',      
    },
    ':active':{
      backgroundColor:'red',
      color:'white'
    }      
  }
  
}