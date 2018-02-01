import React, { Component } from 'react';
import Projects from './Projects.js';
import Login from './Login.js';


class App extends Component {


  componentWillMount=(e)=>{   
    var firebase = require('firebase');
    var config = {
            apiKey: "AIzaSyDz7DCKOfgpVY5XWyy6KG4eLp-PMGF_KEk",
            authDomain: "baxter-parc.firebaseapp.com",
            databaseURL: "https://baxter-parc.firebaseio.com",
            projectId: "baxter-parc",
            storageBucket: "",
            messagingSenderId: "712498374479"
          };
    firebase.initializeApp(config);


    

  }
  
  render() {
    var currentUser = null;
    var firebase = require('firebase');
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("%cCURRENT USER'S E-MAIL: " + user.email, "background: blue; color:white");
        currentUser = user;
        
      } 
      else {
        // No user is signed in.
        console.log("%cNO USER SIGNED IN" , "background: blue; color:white");
        
      }
    });

    if (currentUser!== null){
      
      return (
          <div className="App" style={styles.appContainer}>        
            <div className="projectsContainer">
                <Projects/>
            </div>
          </div>
        );
    }else{
      
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
  appContainer:{
    backgroundColor:'blue'
  },
  appTitle:{
    color:'white',
    fontFamily:'Fjalla One',
    width:'100%',
    textAlign:'center'
  }
  
}