import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class ProjectStatus extends Component{

	render(){
		return(
			<StyleRoot>
				<div className="ProjectStatus">
                    <div className="projectStatusButtonsContainer" style={styles.projectStatusButtonsContainer}>
		                <button className="projectStatusButtonCancel" key="projectStatusButtonCancel" style={styles.projectStatusButtonCancel} onClick={this.props.backToProjects}>CANCEL</button>
		            </div>
				</div>
			</StyleRoot>
		)
	}
}

export default ProjectStatus;

const styles={
    projectStatusButtonsContainer:{
	    display:'flex',
	    justifyContent:'center',

	},	
	projectStatusButtonCancel:{
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
	    
	},
}
