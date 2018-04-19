import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class Message extends Component{
    constructor(props) {
        super(props);
        this.state={
            userClickedMessages:""
        }
        this.db = firebase.firestore();
      }
    handleSubmitButtonClick=(e)=>{       
        
        var dateObj = new Date();
        var curMonth = dateObj.getMonth().toString();
        var curDay = dateObj.getDay().toString();
        var curYear = dateObj.getFullYear().toString();
        var curHour = dateObj.getHours().toString();
        var curMins = dateObj.getMinutes().toString();
        var curSecs = dateObj.getSeconds().toString();
        var date = curHour + curMins + curSecs;
        console.log(dateObj);
        var allUsers = this.db.collection('users'); //GET ALL USERS IN FIREBASE
        var messageFrom = this.props.messageFrom;
        var messageInput = document.getElementById('messageInput');
		var dataObj = {	//CREATE OBJECT THAT WILL SET UP THE MESSAGES FIELD IN THE USER ADDED TO THE PROJECT
				projectNumber:this.props.number,		
				date:dateObj,
                messageFromDisplayName:messageFrom.displayName,
                messageFromEmail:messageFrom.email,
				replied:false,
				resolved:false,
				messageText:messageInput.value				
		}
		//CREATE NESTED OBJECT THAT WILL CONTAIN THE OBJECT CREATED ABOVE, NEED TO DO IT
		//THIS WAY TO AVOID ERRORS WHEN UPDATING IN FIREBASE. IT WILL THROW A 
		//DocumentReference.update() ERROR OTHERWISE
		var initialObjInFB = { 
			messages:[dataObj]			
		}
		allUsers.get() //GET ALL USERS FROM 'users' COLLECTION REFERENCE CREATED
		.then(snapshot=>{
			snapshot.forEach(doc=>{				
				//IF THE FULL NAME IN FIREBASE MATCHES THE CURRENTLY SELECTED NAME IN THE DROPDOWN <select> TAG
				//AND THE USER CURRENTLY DOES NOT HAVE AN ASSIGNED PROJECT, CREATE A message FIELD IN FIREBASE
				if(doc.data().fullName === this.props.currentUser && typeof doc.data().messages === 'undefined'){
					allUsers.doc(doc.id).update(initialObjInFB);
				//IF THE USER HAS PREVIOUSLY BEEN ASSIGNED A PROJECT, THEN GET THE CURRENT message FIELD IN FIREBASE
				//AND UPDATE IT.
				}else if (doc.data().fullName === this.props.currentUser){
					var currentMessages = doc.data().messages;				
					currentMessages.push(dataObj);					
					allUsers.doc(doc.id).update({messages:currentMessages});
				}
			})
		})
		.catch(err => {
            console.log('Error getting documents', err);
        });
        
        
    }
    componentDidUpdate=(e)=>{

    }
	render(){
		return(
			<StyleRoot>
				<div className="Message" style={styles.Message}>
                    <h1 style={styles.projectTitle}>{this.props.title}</h1>
                    <h1 style={styles.projectNumber}>{this.props.number}</h1>
                    <h1 style={styles.currentUser}>Submit your message for {this.props.currentUser}</h1>

                    <div style={styles.messageDescriptionDiv}>
                        <label style={styles.messageDescriptionLabel}>Message:</label>
                        <input id="messageInput" style={styles.messageDescriptionInput}></input>
                    </div>
                    <div style={styles.messageDescriptionDiv}>
                        <label style={styles.messageDescriptionLabel}>Component:</label>
                        <input style={styles.messageDescriptionInput}></input>
                    </div>
                    <div style={styles.messageDescriptionDiv}>
                        <label style={styles.messageDescriptionLabel}>Sheet:</label>
                        <input style={styles.messageDescriptionInput}></input>
                    </div>
                    <button style={styles.messageButtonSubmit} key="messageButtonSubmit" onClick={this.handleSubmitButtonClick}>SUBMIT</button>
                    <button style={styles.messageButtonCancel} key="messageButtonCancel" onClick={this.props.backToProjects}> CANCEL </button>
				</div>
			</StyleRoot>
		)
	}
}

export default Message;

const styles={
    Message:{        
        width:'50%',
        textAlign:'center',
        border:'solid 1px white',
        marginLeft:'auto',
        marginRight:'auto'
    },
    projectTitle:{
        fontFamily:'Fjalla One',
        fontSize:24,
        color:'white'
    },
    projectNumber:{
        fontFamily:'Fjalla One',
        fontSize:24,
        color:'white'
    },
    currentUser:{
        fontFamily:'Fjalla One',
        fontSize:20,
        color:'white'
    },
    messageDescriptionDiv:{
        display:'flex',
        justifyContent:'center',
        marginTop:50,
        marginBottom:50
    },
    messageDescriptionLabel:{
        width:'20%',
        fontFamily:'Fjalla One',
        fontSize:20,
        color:'white',
        marginRight:20
    },
    messageDescriptionInput:{
        fontFamily:'Fjalla One',
        fontSize:16,
        textAlign:'center',        
        border:'none',
       
        width:'60%',
        paddingLeft:10,
        textAlign:'left'
    },
    messageButtonSubmit:{
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
	messageButtonCancel:{
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