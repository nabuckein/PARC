import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class NewProject extends Component{

	componentWillMount=(e)=>{
	    require("firebase/firestore");
	    
	}  	

	render(){
		return(
			<StyleRoot>
				<div className="NewProject" style={styles.NewProject}>
					<div className="newProjectContainer" style={styles.newProjectContainer}>                 
			            <h1 className="newProjectMainTitle" style={styles.newProjectMainTitle}>ENTER NEW PROJECT INFORMATION:</h1>
			            <div className="newProjectInputsContainer" style={styles.newProjectInputsContainer}>
			            	<input className="newProjectInput" id="newProjectName" style={styles.newProjectInput} placeholder="Project Name" key="newProjectName"></input>
			                {/*<input className="loginInput" id="loginUserIDInput" style={styles.loginInput} placeholder="Please enter your User ID"></input>*/}
			                <input className="newProjectInput" id="newProjectID" style={styles.newProjectInput} placeholder="Project ID/Number" key="newProjectID"></input>
			                <div className="selectContainers" style={styles.selectContainers}>
				                <div className="newProjectSelectPLContainer" style={styles.select}>
				                	<label className="newProjectSelectLabel" style={styles.newProjectSelectLabel}>PROJECT LEAD:</label>
					                <select className="newProjectSelect" id="newProjectSelectPL" style={styles.newProjectSelect} placeholder="Project Lead" key="newProjectSelectPL">
					                	<option className="newProjectSelectOption" value="TEST" style={styles.newProjectSelectOption}>TEST</option>
					                	<option className="newProjectSelectOption" value="TEST1" style={styles.newProjectSelectOption}>TEST1</option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                </select>
				                </div>
				                <div className="newProjectSelectEEContainer" style={styles.select}>
				                	<label className="newProjectSelectLabel" style={styles.newProjectSelectLabel}>ELECTRICAL ENGINEER:</label>	
					                <select className="newProjectSelect" id="newProjectSelectEE" style={styles.newProjectSelect} placeholder="Project Lead" key="newProjectSelectEE">
					                	<option className="newProjectSelectOption" value="TEST" style={styles.newProjectSelectOption}>TEST</option>
					                	<option className="newProjectSelectOption" value="TEST1" style={styles.newProjectSelectOption}>TEST1</option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                </select>
				                </div>
				                <div className="newProjectSelectEDContainer" style={styles.select}>
				                	<label className="newProjectSelectLabel" style={styles.newProjectSelectLabel}>ELECTRICAL DESIGNER:</label>	
					                <select className="newProjectSelect" id="newProjectSelectED" style={styles.newProjectSelect} placeholder="Project Lead" key="newProjectSelectED">
					                	<option className="newProjectSelectOption" value="TEST" style={styles.newProjectSelectOption}>TEST</option>
					                	<option className="newProjectSelectOption" value="TEST1" style={styles.newProjectSelectOption}>TEST1</option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                </select>
				                </div>
				                <div className="newProjectSelectETContainer" style={styles.select}>
				                	<label className="newProjectSelectLabel" style={styles.newProjectSelectLabel}>ELECTRICAL TECHNICIAN:</label>	
					                <select className="newProjectSelect" id="newProjectSelectET" style={styles.newProjectSelect} placeholder="Project Lead" key="newProjectSelectET">
					                	<option className="newProjectSelectOption" value="TEST" style={styles.newProjectSelectOption}>TEST</option>
					                	<option className="newProjectSelectOption" value="TEST1" style={styles.newProjectSelectOption}>TEST1</option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                </select>
				                </div>
				                <div className="newProjectSelectMEContainer" style={styles.select}>
				                	<label className="newProjectSelectLabel" style={styles.newProjectSelectLabel}>MECHANICAL ENGINEER:</label>	
					                <select className="newProjectSelect" id="newProjectSelectME" style={styles.newProjectSelect} placeholder="Project Lead" key="newProjectSelectME">
					                	<option className="newProjectSelectOption" value="TEST" style={styles.newProjectSelectOption}>TEST</option>
					                	<option className="newProjectSelectOption" value="TEST1" style={styles.newProjectSelectOption}>TEST1</option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                </select>
				                </div>
				                <div className="newProjectSelectMDContainer" style={styles.select}>
				                	<label className="newProjectSelectLabel" style={styles.newProjectSelectLabel}>MECHANICAL DESIGNER:</label>	
					                <select className="newProjectSelect" id="newProjectSelectMD" style={styles.newProjectSelect} placeholder="Project Lead" key="newProjectSelectMD">
					                	<option className="newProjectSelectOption" value="TEST" style={styles.newProjectSelectOption}>TEST</option>
					                	<option className="newProjectSelectOption" value="TEST1" style={styles.newProjectSelectOption}>TEST1</option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                </select>
				                </div>
				                <div className="newProjectSelectMTContainer" style={styles.select}>
				                	<label className="newProjectSelectLabel" style={styles.newProjectSelectLabel}>MECHANICAL TECHNICIAN:</label>	
					                <select className="newProjectSelect" id="newProjectSelectMT" style={styles.newProjectSelect} placeholder="Project Lead" key="newProjectSelectMT">
					                	<option className="newProjectSelectOption" value="TEST" style={styles.newProjectSelectOption}>TEST</option>
					                	<option className="newProjectSelectOption" value="TEST1" style={styles.newProjectSelectOption}>TEST1</option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                </select>
				                </div>
				                <div className="newProjectSelectDSContainer" style={styles.select}>
				                	<label className="newProjectSelectLabel" style={styles.newProjectSelectLabel}>DOCUMENTATION SPECIALIST:</label>	
					                <select className="newProjectSelect" id="newProjectSelectDS" style={styles.newProjectSelect} placeholder="Project Lead" key="newProjectSelectDS">
					                	<option className="newProjectSelectOption" value="TEST" style={styles.newProjectSelectOption}>TEST</option>
					                	<option className="newProjectSelectOption" value="TEST1" style={styles.newProjectSelectOption}>TEST1</option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                	<option className="newProjectSelectOption"></option>
					                </select>
				                </div>

				            </div>
			            </div>
			            <p className="newProjectErrorMessage" id="newProjectErrorMessageText" style={styles.newProjectErrorMessage}> Is your e-mail and password correct? </p>
			        </div>
		            <div className="newProjectButtonsContainer" style={styles.newProjectButtonsContainer}>
		          	    <button className="newProjectButtonSubmit" key="newProjectButtonSubmit" style={styles.newProjectButtonSubmit} onClick={this.props.handleNewProjectSubmitButtonClick}>SUBMIT</button>
		                <button className="newProjectButtonCancel" key="newProjectButtonCancel" style={styles.newProjectButtonCancel} onClick={this.props.backToProjects}>CANCEL</button>
		            </div>			        
				</div>
			</StyleRoot>
		)
	}
}

export default NewProject;

const styles = {
	NewProject:{
		width:'100%'
	},
	newProjectContainer:{
	    textAlign:'center'
	},
	newProjectInputsContainer:{
	    display:'flex',
	    flexWrap:'wrap',
	    justifyContent:'center',
	    width:'40%',
	    marginLeft:'auto',
	    marginRight:'auto',
	    marginBottom:60
	},
	newProjectInput:{
	    fontFamily:'Pathway Gothic One',
	    width:'60%',
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
	    marginTop:20,
	    marginBottom:20,
	    fontSize:20,
	    ':focus':{
	    	borderBottom:'solid red 1px'
	    }
	},
	newProjectMainTitle:{
	    fontFamily:'Fjalla One',
	    color:'white',
	    fontSize:28,
	    marginTop:140
	},
	newProjectErrorMessage:{
		color:'blue'
	},
	newProjectButtonsContainer:{
	    display:'flex',
	    justifyContent:'center',

	},
	newProjectButtonSubmit:{
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
	newProjectButtonCancel:{
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
	
	selectContainers:{
		display:'flex',
		flexWrap:'wrap',
		
		width:'100%',
		marginTop:20
	},
	select:{
		width:'100%',
		display:'flex',
		flexWrap:'wrap',
		justifyContent:'center'

	},
	newProjectSelectLabel:{
		fontFamily:'Pathway Gothic One',
		color:'white',
		fontSize:22,
		marginTop:20,
		marginRight:20,
		width:'40%',
		textAlign:'right'
	},
	newProjectSelect:{
		width:'50%',
		marginTop:20,
		fontFamily:'Pathway Gothic One',
		fontSize:20
		
	},
	newProjectSelectOption:{
		fontFamily:'Pathway Gothic One',
		backgroundColor:'blue'
	}


}