import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';
const firebase = require("firebase");

class Signup extends Component {

  handleSubmitButtonClick=(e)=>{
    var firstNameInput = document.getElementById('signupFirstNameInput');
    var lastNameInput = document.getElementById('signupLastNameInput');
    var emailInput = document.getElementById('signupEmailInput');
    var passwordInput = document.getElementById('signupPasswordInput');
    var userIdInput = document.getElementById('signupUserIDInput');
    var displayName = firstNameInput.value + " " + lastNameInput.value;
    firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function(user){
      console.log(user);  
      user.updateProfile({
        displayName: displayName
      })
      
    },function(error){
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }); 
  }

  render() {
    return (
      <StyleRoot>
        <div className="Login" style={styles.Signup}>
          <div className="signupContainer" style={styles.inputsContainer}>                 
              <h1 className="signupMainTitle" style={styles.signupMainTitle}>Please log in:</h1>
              <input id="signupFirstNameInput" style={styles.signupInput} placeholder="Enter your first name here (required)" ></input>
              <input id="signupLastNameInput" style={styles.signupInput} placeholder="Enter your last name here (required)" ></input>
              <input id="signupEmailInput" style={styles.signupInput} placeholder="Enter your e-mail here (required)"></input>
              <input id="signupPasswordInput" style={styles.signupInput} placeholder="Enter your password here (required)"></input>
              <input id="signupUserIDInput" style={styles.signupInput} placeholder="Enter your user ID here (optional)"></input>
          </div>
          <div className="signupButtonContainer" style={styles.signupButtonContainer}>
            <button className="signupButtonSubmit" key="signupButtonSubmit" style={styles.signupButtonSubmit} onClick={this.handleSubmitButtonClick}>SUBMIT</button>
            <button className="signupButtonCancel" key="signupButtonCancel" style={styles.signupButtonCancel} onClick={this.props.handleCancelSignupClick}>CANCEL</button>
          </div>
        </div>
      </StyleRoot>
    );
  }
}


export default Signup;

const styles = {
  Signup:{
    width:'100%',
    backgroundColor:'blue'
  },
  signupContainer:{
    textAlign:'center'
  },
  inputsContainer:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'center',
    width:'20%',
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:100
  },
  signupInput:{
    fontFamily:'Pathway Gothic One',
    width:'100%',
    height:30,
    color:'white',
    textAlign:'center',
    justifyContent:'center',
    backgroundColor:'blue',
    borderTop:'none',
    borderRight:'none',
    borderLeft:'none',
    borderBottom:'solid white 1px',
    borderRadius:6,
    marginTop:40,
    fontSize:20
  },
  signupMainTitle:{
    fontFamily:'Fjalla One',
    color:'white',
    fontSize:28,
    marginTop:140
  },
  signupButtonContainer:{
    display:'flex',
    justifyContent:'center',

  },
  signupButtonSubmit:{
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
      backgroundColor:'limegreen',      
    },
    ':active':{
      backgroundColor:'green',
      color:'white'
    }
  },
  signupButtonCancel:{
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
    },
    
  }
}