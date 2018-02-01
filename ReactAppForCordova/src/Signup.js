import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

class Login extends Component {
  render() {
    return (
      <StyleRoot>
        <div className="Login" style={styles.Login}>
          <div className="loginContainer" style={styles.loginContainer}>                 
              <h1 className="loginMainTitle" style={styles.loginMainTitle}>Please log in:</h1>
              <input className="loginFirstNameInput" style={styles.loginFirstNameInput}></input>
              <input className="loginLastNameInput" style={styles.loginLastNameInput}></input>
              <input className="loginEmail" style={styles.loginEmail}></input>
              <input className="loginUserID" style={styles.loginUserID}></input>
          </div>
          
        </div>
      </StyleRoot>
    );
  }
}


export default Login;

const styles = {
  Login:{
    width:'100%',
    backgroundColor:'blue'
  },
  loginContainer:{
    
  }
}