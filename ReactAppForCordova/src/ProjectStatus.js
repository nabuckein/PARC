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
	}
	componentWillMount=(e)=>{
		
		for (var n=0; n<=this.state.teamMembers.length-1; n++){ //GET THE TEAM MEMBERS NAME AND PUT THEM IN teamMembers STATE (REPLACES THE PASSED DOWN FROM PROJECT VIA this.props.team)
			var teamRef = this.state.teamMembers[n];
			//console.log(Object.keys(teamRef));
			teamRef.get().then(doc=>{
				console.log(doc.data().firstName + " " + doc.data().lastName);
				this.teamMembersP.push(doc.data().firstName + " " + doc.data().lastName);
				this.setState({teamMembers:this.teamMembersP});
			}).catch(err => {
				console.log('Error getting documents, when trying to get team members names', err);
			});
		}

		var teamMemberOptions = []; //GET NAMES OF ALL USERS TO POPULATE <option> TAGS FOR WHEN TRYING TO ADD A NEW MEMBER TO THE PROJECT
		var db = firebase.firestore();
		var dbRef = db.collection('users');
		dbRef.get().then(snapshot => {
			snapshot.forEach(doc => {
				//console.log(doc.id, '=>', doc.data().firstName);
				teamMemberOptions.push(<option className="projectStatusAddTeamMemberOption" key={"key" + doc.id} value="TEST" style={styles.projectStatusOption}>{doc.data().firstName + " " + doc.data().lastName}</option>)
			});
			this.setState({teamMemberOptions:teamMemberOptions});
		})
		.catch(err => {
			console.log('Error getting documents, when trying to get names to go into <option> in <select> tag', err);
		});
	}
	componentDidMount=(e)=>{
		
		
		
	}

	addTeamMemberClick=(e)=>{
		document.getElementById('addTeamMemberSelect').style.opacity = '1.0';
	}
	submitTeamMemberClick=(e)=>{
		
		document.getElementById('addTeamMemberSelect').style.opacity = '0.0';

	}
	cancelAddTeamMemberClick=(e)=>{
		document.getElementById('addTeamMemberSelect').style.opacity = '0.0';
	}

	render(){
		
		if(this.state.teamMembers.length>=1){
			
			var teamMembersP=[];
			
			for(var n=0; n<=this.state.teamMembers.length-1; n++){
				teamMembersP.push(<p key={"keyTeamMember" + n} style={styles.projectStatusTeamMember}>{this.teamMembersP[n]}</p>);
				console.log(teamMembersP);
			}
			
			//{}
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
								<div id="addTeamMemberSelect" style={styles.projectStatusNewTeamMemberSelectAndButton}>
									<select className="projectStatusAddTeamMemberSelect" style={styles.projectStatusSelect} placeholder="Add Team Member" key="projectStatusAddTeamMemberSelect" >
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
		}
		else {
		//teamMembersEls.push(<p key="loading">Loading</p>);
			return (
				null
			)
		}
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
	projectStatusTeamMember:{
		color:'white',
		fontFamily:'Fjalla One'
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
