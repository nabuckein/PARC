import React, { Component } from 'react';



class RecentActivity extends Component {
  render() {
    return (
      <div className="RecentActivity" style={styles.RecentActivity}>
        <div className="recentActivityTitleContainer" style={styles.recentActivityTitleContainer}>                 
            <h1 className="recentActivityMainTitle" style={styles.recentActivityMainTitle}>RECENT ACTIVITY</h1>
        </div>
        
      </div>
    );
  }
}


export default RecentActivity;

const styles = {
  RecentActivity:{
    textAlign:'center'
  },
  recentActivityTitleContainer:{
    
    textAlign:'center'
  },
  recentActivityMainTitle:{
    color:'white',
    fontFamily:'Fjalla One',
  }
  
}