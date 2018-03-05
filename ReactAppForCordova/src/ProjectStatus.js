import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class ProjectStatus extends Component{
	
	constructor(props){
		super(props);
		this.state={
			teamMembers:[]
		}
		
	}
	componentWillMount=(e)=>{
		require("firebase/firestore");
		var db = firebase.firestore();
		var cityRef = db.collection('projects').doc('09493C'); 
		var teamRef;
		var that = this;
		var teamMembersEls =[];
		var getDoc = cityRef.get()
			.then(doc => {
				if (!doc.exists) {
					console.log('No such document!');
				} else {
					teamRef = doc.data().team;
					//this.setState({teamMembers:teamRef});
					/*
					ref.get().then(documentSnapshot => { //GET ONLY FIRST NAME IN tHIs REFERENCE
					if (documentSnapshot.exists) {
						console.log(documentSnapshot.get('firstName'));
					}
					});*/
				}
			}).then(err=>{
				for(var n=0; n<=teamRef.length-1; n++){
					teamRef[n].get().then(documentSnapshot => { //GET ENTIRE DOCUMENT IN THE REFERENCE
						let data = documentSnapshot.data();
						teamMembersEls.push(data.firstName);
						//console.log(data.firstName);
					}).then(err=>{
						this.setState({teamMembers:teamMembersEls});
					});
				}
				
			}).catch(err => {
				console.log('Error getting document', err);
			});
			
			
			

	}
	componentDidMount=(e)=>{

	}

	

	render(){
		
		console.log(this.state.teamMembers.length);
		if(this.state.teamMembers.length>=0){
			/*teamMembersEls =[];
			var ref =  this.state.teamMembers;
			for(var n=0; n<=ref.length-1; n++){
				ref[n].get().then(documentSnapshot => { //GET ENTIRE DOCUMENT IN THE REFERENCE
					let data = documentSnapshot.data();
					teamMembersEls.push(<p>{data.firstName}</p>);
					//console.log(data.firstName);
				});
			}
				*/
			//console.log(ref.firstName);
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
								<p>{this.state.teamMembers[0]}</p>
								<p>{this.state.teamMembers[1]}</p>
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
		width:'30%'
	},
	projectStatusSecondaryTitle:{
		color:'white',
		fontFamily:'Fjalla One',
		textAlign:'center'
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
