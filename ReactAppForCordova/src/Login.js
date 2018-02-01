import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

class Login extends Component {

  handleSubmitButtonClick=(e)=>{
    var firebase = require("firebase");
    firebase.auth().signInWithEmailAndPassword("pauri@hotmail.com", "test1234").catch(function(error) {
  // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorMessage);
    });
  }

  render() {
    return (
      <StyleRoot className="LoginStyleRoot" style={styles.LoginStyleRoot}>
        <div className="Login" style={styles.Login}>
          <div className="loginContainer" style={styles.loginContainer}>                 
              <h1 className="loginMainTitle" style={styles.loginMainTitle}>Please log in:</h1>
              <div className="inputsContainer" style={styles.inputsContainer}>
                <input className="loginInput" style={styles.loginInput} placeholder="Please enter your e-mail"></input>
                <input className="loginInput" style={styles.loginInput} placeholder="Please enter your User ID"></input>
                <input className="loginInput" style={styles.loginInput} placeholder="Please enter your password"></input>
              </div>
          </div>
          <div className="loginButtonsContainer" style={styles.loginButtonsContainer}>
            <button className="loginButtonSubmit" key="loginButtonSubmit" style={styles.loginButtonSubmit} onClick={this.handleSubmitButtonClick}>SUBMIT</button>
            <button className="loginButtonCancel" key="loginButtonCancel" style={styles.loginButtonCancel}>CANCEL</button>
          </div>
          
        </div>
      </StyleRoot>
    );
  }
}


export default Login;

const styles = {
  LoginStyleRoot:{
    backgroundColor:'blue',
    height:'100%'
  },
  Login:{
    width:'100%',
    backgroundColor:'blue'
  },
  loginContainer:{
    textAlign:'center'
  },
  inputsContainer:{
    display:'flex',
    flexWrap:'wrap',
    width:'25%',
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:200
  },
  loginInput:{
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
    marginTop:60
  },
  loginMainTitle:{
    fontFamily:'Fjalla One',
    color:'white'
  },
  loginButtonsContainer:{
    display:'flex',
    justifyContent:'center',

  },
  loginButtonSubmit:{
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
      backgroundColor:'green',      
    },
    ':active':{
      backgroundColor:'green',
      color:'white'
    }
  },
  loginButtonCancel:{
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