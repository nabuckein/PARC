import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class ProjectStatus extends Component{
	
	constructor(props){
		super(props);
		this.state={
			teamMembers:this.props.team,
			teamMemberOptions:[]
		}
		this.teamMembersP = [];
		this.db = firebase.firestore();
	}
	updateAddMemberOptions=(e)=>{
		var teamMemberOptions = [];
		var dbRef = this.db.collection('users');
		dbRef.get().then(snapshot => {
			var teamMemberArr = []; //GET ARRAY OF TEAM MEMBERS DISPLAYED IN LABEL COMPONENT
			var teamMemberArrClass = document.getElementsByClassName('projectStatusTeamMember'); 
			for(var n=0; n<=teamMemberArrClass.length-1; n++){
				teamMemberArr.push(teamMemberArrClass[n].innerHTML)
			}
			snapshot.forEach(doc => {
				if(!teamMemberArr.includes(doc.data().fullName)){
					teamMemberOptions.push(<option className="projectStatusAddTeamMemberOption" key={"key" + doc.id} value={doc.data().fullName} style={styles.projectStatusOption}>{doc.data().fullName}</option>)
				}
			});
			if(teamMemberOptions.length===0){
				teamMemberOptions.push(<option className="projectStatusAddTeamMemberOption" key={"key" + snapshot.id} value="N/A" style={styles.projectStatusOption}> - </option>)
			}
			this.setState({teamMemberOptions:teamMemberOptions});
				
		})
		.catch(err => {
			console.log('Error getting documents, when trying to get names to go into <option> in <select> tag', err);
		});
	}
	componentWillMount=(e)=>{
		
		this.updateAddMemberOptions();

	}
	addTeamMemberClick=(e)=>{
		document.getElementById('addTeamMemberSelectDiv').style.visibility = 'visible'; //SHOW <select> ELEMENT WHEN "ADD TEAM MEMBER"
		//BUTTON IS CLICKED
	}
	submitTeamMemberClick=(e)=>{
		//WHEN THE CURRENT USER CLICKS "ADD" BUTTON NEXT TO THE <select> ELEMENT TO ADD A UER TO A PROJECT,
		//WE NEED TO DO THE FOLLOWING TO UPDATE THE THIS COMPONENT AND THE BACKEND AS WELL.

		var selectElIndex = document.getElementById("addTeamMemberSelect").selectedIndex; //GET THE INDEX OF OPTION CURRENTLY SELECTED
		document.getElementById('addTeamMemberSelectDiv').style.visibility = 'hidden'; //HIDE THE <select> ELEMENT FOR ADDING
		//A NEW USER TO THE PROJECT WHEN THE "ADD" BUTTON NEXT TO THE NAME OF THE USER IS CLICKED
		var nameToSubmit = 	document.getElementsByTagName("option")[selectElIndex].value; //nameToSubmit WILL NOW HAVE THE NAME
		//OF THE CURRENTLY SELECTED USER
		var arrayOfTeamMembers = this.state.teamMembers; //THIS VARIABLE WILL NOW HAVE THE ARRAY OF TEAM MEMBERS CURRENTLY IN THIS
		//COMPONENT. THIS IS USED TO DISPLAY THEM IN THE "TEAM" AREA OF THE COMPONENT

		if(arrayOfTeamMembers[0]===""){// WE DO THIS TO REMOVE THE FIRST ELEMENT IN THE ARRAY IF THE THE PROJECT HAS NO 
			//TEAM MEMBERS YET (THIS IS PASSED AS props FROM THE "PROJECTS" COMPONENT.
			arrayOfTeamMembers.shift();
		}
		arrayOfTeamMembers.push(nameToSubmit);

		//NOW WE CAN UPDATE THE FIREBASE BACKEND WITH THE APPROPIATE TEAM MEMBERS
		this.db.collection('projects').doc(this.props.number).update({team:arrayOfTeamMembers});
		this.setState({teamMembers:arrayOfTeamMembers});
		/*--------------------------------------------------------------------------------------------------//
		//NOW WE NEED TO SETUP A messages FIELD IN THE USER ADDED TO THIS PROJECT IN FIREBASE
		var allUsers = this.db.collection('users'); //GET ALL USERS IN FIREBASE
		var dataObj = {	//CREATE OBJECT THAT WILL SET UP THE MESSAGES FIELD IN THE USER ADDED TO THE PROJECT
				projectNumber:this.props.number,		
				date:0,
				messageFrom:'init',
				replied:false,
				resolved:false,
				messageText:'init'				
		}
		//CREATE NESTED OBJECT THAT WILL CONTAIN THE OBJECT CREATED ABOVE, NEED TO DO IT
		//THIS WAY TO AVOID ERRORS WHEN UPDATING IN FIREBASE. IT WILL THROW A 
		//DocumentReference.update() ERROR OTHERWISE
		var initialObjInFB = { 
			messages:[dataObj]			
		}		
		

		allUsers.get()
		.then(snapshot=>{
			snapshot.forEach(doc=>{
				
				//IF THE FULL NAME IN FIREBASE MATCHES THE CURRENTLY SELECTED NAME IN THE DROPDOWN <select> TAG
				//AND THE USER CURRENTLY DOES NOT HAVE AN ASSIGNED PROJECT, CREATE A message FIELD IN FIREBASE
				if(doc.data().fullName === nameToSubmit && typeof doc.data().messages === 'undefined'){
					allUsers.doc(doc.id).update(initialObjInFB);
				//IF THE USER HAS PREVIOUSLY BEEN ASSIGNED A PROJECT, THEN GET THE CURRENT message FIELD IN FIREBASE
				//AND UPDATE IT.
				}else if (doc.data().fullName === nameToSubmit){
					var currentMessages = doc.data().messages;				
					currentMessages.push(dataObj);					
					allUsers.doc(doc.id).update({messages:currentMessages});
				}
			})
		})
		.catch(err => {
            console.log('Error getting documents', err);
		});
		
		this.updateAddMemberOptions();
		
		*/
	}
	removeTeamMemberClick=(e)=>{		
		var arrayOfTeamMembers = this.state.teamMembers;
		var filteredArray = arrayOfTeamMembers.filter(el=>{
			return el!==e.target.id
		})
		this.db.collection('projects').doc(this.props.number).update({team:filteredArray});
		this.setState({teamMembers:filteredArray});
		this.updateAddMemberOptions();
	}
	cancelAddTeamMemberClick=(e)=>{
		document.getElementById('addTeamMemberSelectDiv').style.visibility = 'hidden';;
	}

	render(){
		//if(this.props.team.length>=0){
			var teamMembersP=[];			
			for(var n=0; n<=this.state.teamMembers.length-1; n++){
				teamMembersP.push(<div key={"keyTeamMemberDiv" + n} style={styles.projectStatusTeamMemberDiv}>
				<label key={"keyTeamMember" + n} className="projectStatusTeamMember" style={styles.projectStatusTeamMember} value={this.state.teamMembers[n]}>{this.state.teamMembers[n]}</label>
				<button id={this.state.teamMembers[n]} key={"keyTeamMemberButton" + n} onClick={this.removeTeamMemberClick} style={styles.projectStatusRemoveTeamMemberButton}>X</button>
				<button id="test" key={"keyTeamMemberEmailButton" + n} onClick={this.props.toMessage} style={styles.projectStatusMessageTeamMemberButton}>MESSAGE</button>
				</div>);
			}	
			return(
				<div>
				<StyleRoot >
					<div className="ProjectStatus" style={styles.ProjectStatus}>
						<h1 style={styles.title}>{this.props.title}</h1>
						<h1 style={styles.title}>{this.props.number}</h1>
						
						<div className="projectStatusAreaContainer" style={styles.projectStatusAreaContainer}>

							<div style={styles.projectStatusArea}>
								<h2 style={styles.projectStatusSecondaryTitle}>Redline History</h2>
							</div>

							<div style={styles.projectStatusArea}>
								<h2 style={styles.projectStatusSecondaryTitle}>Future Considerations</h2>
							</div>

							<div style={styles.projectStatusArea}>
								<h2 style={styles.projectStatusSecondaryTitle}>Team</h2>
								{teamMembersP}
								<div id="addTeamMemberSelectDiv" style={styles.projectStatusNewTeamMemberSelectAndButton}>
									<select className="projectStatusAddTeamMemberSelect" id="addTeamMemberSelect" style={styles.projectStatusSelect} placeholder="Add Team Member" key="projectStatusAddTeamMemberSelect" >
										{this.state.teamMemberOptions}
									</select>
									<button onClick={this.submitTeamMemberClick} className="projectStatusAddNewTeamMemberButton" style={styles.projectStatusAddNewTeamMemberButton} key="projectStatusAddNewTeamMemberButton">ADD</button>
									<button onClick={this.cancelAddTeamMemberClick} className="projectStatusCancelAddNewTeamMemberButton" style={styles.projectStatusCancelAddNewTeamMemberButton} key="projectStatusCancelAddNewTeamMemberButton">CANCEL</button>

								</div>
								<button className="projectStatusButton" style={styles.projectStatusButton} onClick={this.addTeamMemberClick}>ADD TEAM MEMBER</button>
							</div>

						</div>

						<div className="projectStatusButtonsContainer" style={styles.projectStatusButtonsContainer}>
							<button className="projectStatusButtonCancel" key="projectStatusButtonCancel" style={styles.projectStatusButtonCancel} onClick={this.props.backToProjects}>CANCEL</button>
						</div>

					</div>
					
				</StyleRoot>
				</div>
			)
		//}
		
	}
}

export default ProjectStatus;

const styles={
	ProjectStatus:{
		width:'100%'
	},
	title:{
		color:'white',
		fontFamily:'Fjalla One',
		textAlign:'center',
		width:'100%'
	},
	projectStatusAreaContainer:{
		display:'flex',
		justifyContent:'space-around',
		width:'100%'
	},
	projectStatusArea:{
		width:'30%',
		textAlign:'center'
	},
	projectStatusSecondaryTitle:{
		color:'white',
		fontFamily:'Fjalla One',
		textAlign:'center'
	},
	projectStatusTeamMemberDiv:{
		marginBottom:10,
		display:'flex',
		justifyContent:'center'
	},
	projectStatusTeamMember:{
		color:'white',
		fontFamily:'Fjalla One',
		width:'50%'
		
	},
	projectStatusButton:{
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
	projectStatusNewTeamMemberSelectAndButton:{
		visibility:'hidden'
	},
	projectStatusSelect:{
		width:'50%',
		marginTop:20,
		fontFamily:'Pathway Gothic One',
		fontSize:20,
		marginBottom:20		
	},
	projectStatusOption:{
		fontFamily:'Pathway Gothic One',
		backgroundColor:'white'
	},
	projectStatusAddNewTeamMemberButton:{
		
		fontFamily:'Pathway Gothic One',
		backgroundColor:'green',
		color:'white',
		border:'none',
		marginLeft:10,
		fontSize:20,
		':hover':{
			backgroundColor:'green',
			color:'black'
		},
		':active':{
			backgroundColor:'white',
			color:'green'
		}

	},
	projectStatusCancelAddNewTeamMemberButton:{
		fontFamily:'Pathway Gothic One',
		backgroundColor:'red',
		color:'white',
		border:'none',
		marginLeft:10,
		fontSize:20,
		':hover':{
			backgroundColor:'red',
			color:'black'
		},
		':active':{
			backgroundColor:'white',
			color:'red'
		}
	},
	projectStatusRemoveTeamMemberButton:{
		fontSize:20,
		backgroundColor:'orange',
		color:'white',
		border:'none',
		fontFamily:'Pathway Gothic One',
		marginLeft:10,
		':hover':{
			backgroundColor:'red',
			color:'black'
		},
		':active':{
			backgroundColor:'white',
			color:'red'
		}
	},
	projectStatusMessageTeamMemberButton:{
		fontSize:20,
		backgroundColor:'gray',
		color:'white',
		border:'none',
		fontFamily:'Pathway Gothic One',
		marginLeft:10,
		':hover':{
			backgroundColor:'darkblue',
			color:'white'
		},
		':active':{
			backgroundColor:'white',
			color:'black'
		}
	},
    projectStatusButtonsContainer:{
	    display:'flex',
	    justifyContent:'center'
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
