import React, { Component } from 'react';
import Projects from './Projects.js';


class App extends Component {
  
  render() {
    return (
      <div className="App" style={styles.appContainer}>
        
        <div className="projectsContainer">
            <Projects/>
        </div>
      </div>
    );
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