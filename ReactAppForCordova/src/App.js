import React, { Component } from 'react';
import Projects from './Projects.js';
 

class App extends Component {

  state={
    linkxObject:{}
  }

  componentWillMount=(e)=>{    
    
    /*var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
           // Typical action to be performed when the document is ready:
           console.log(xhttp.status);
        }
    };
    xhttp.open("GET", "C:/Users/sanchem49/Desktop/PARC/ReactAppForCordova/src/xmlFromLinkx/LinkxQuery.xml", true);
    xhttp.send();*/


  }
  
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