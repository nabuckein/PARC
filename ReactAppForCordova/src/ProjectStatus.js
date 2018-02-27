import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class ProjectStatus extends Component{
	componentWillMount=(e)=>{
		require("firebase/firestore");
		var db = firebase.firestore();
		var cityRef = db.collection('projects').doc('09493C');
		var getDoc = cityRef.get()
			.then(doc => {
				if (!doc.exists) {
					console.log('No such document!');
				} else {
					console.log('Document data:', doc.data().team[0]);
				}
			})
			.catch(err => {
				console.log('Error getting document', err);
			});

	}


	render(){
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
