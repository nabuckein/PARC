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
	componentWillMount=(e)=>{

		var teamMemberOptions = [];
		
		var dbRef = this.db.collection('users');
		dbRef.get().then(snapshot => {
			snapshot.forEach(doc => {
					//console.log(doc.id, '=>', doc.data().firstName);
				teamMemberOptions.push(<option className="projectStatusAddTeamMemberOption" key={"key" + doc.id} value={doc.data().fullName} style={styles.projectStatusOption}>{doc.data().fullName}</option>)
			});
			this.setState({teamMemberOptions:teamMemberOptions});
		})
		.catch(err => {
			console.log('Error getting documents, when trying to get names to go into <option> in <select> tag', err);
		});

	}
	addTeamMemberClick=(e)=>{
		//var selectElIndex = document.getElementById("addTeamMemberSelect").selectedIndex;
		document.getElementById('addTeamMemberSelectDiv').style.opacity = '1.0';
		//console.log(document.getElementsByTagName("option")[selectElIndex].value);
	}
	submitTeamMemberClick=(e)=>{
		var selectElIndex = document.getElementById("addTeamMemberSelect").selectedIndex; //GET THE INDEX OF OPTION CURRENTLY SELECTED
		//console.log(document.getElementsByTagName("option")[selectElIndex].value); 
		document.getElementById('addTeamMemberSelectDiv').style.opacity = '0.0';
		var nameToSubmit = 	document.getElementsByTagName("option")[selectElIndex].value;
		var lengthOfTeam = this.state.teamMembers.length;
		var arrayOfTeamMembers = this.state.teamMembers;
		if(arrayOfTeamMembers[0]===""){
			arrayOfTeamMembers.shift();
		}
		arrayOfTeamMembers.push(nameToSubmit);
		this.db.collection('projects').doc(this.props.title).update({team:arrayOfTeamMembers});
		this.setState({teamMembers:arrayOfTeamMembers});
	}
	removeTeamMemberClick=(e)=>{		
		var arrayOfTeamMembers = this.state.teamMembers;
		var filteredArray = arrayOfTeamMembers.filter(el=>{
			return el!==e.target.id
		})
		this.db.collection('projects').doc(this.props.title).update({team:filteredArray});
		this.setState({teamMembers:filteredArray});
	}
	cancelAddTeamMemberClick=(e)=>{
		document.getElementById('addTeamMemberSelectDiv').style.opacity = '0.0';
	}

	render(){
		
		//if(this.props.team.length>=0){
			
			var teamMembersP=[];
			
			for(var n=0; n<=this.state.teamMembers.length-1; n++){
				teamMembersP.push(<div key={"keyTeamMemberDiv" + n} style={styles.projectStatusTeamMemberDiv}><label key={"keyTeamMember" + n} style={styles.projectStatusTeamMember} value={this.state.teamMembers[n]}>{this.state.teamMembers[n]}</label><button id={this.state.teamMembers[n]} key={"keyTeamMemberButton" + n} onClick={this.removeTeamMemberClick} style={styles.projectStatusRemoveTeamMemberButton}>REMOVE</button></div>);
			}	
			return(
				<div>
				<StyleRoot >
					<div className="ProjectStatus" style={styles.ProjectStatus}>
						<h1 style={styles.title}>{this.props.title}</h1>
						
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
		opacity:'0.0'
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
