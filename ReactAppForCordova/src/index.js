import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RecentActivity from './RecentActivity.js';
import Sidebar from './Sidebar.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('projectsReactContainer'));
registerServiceWorker();

/*ReactDOM.render(<RecentActivity />, document.getElementById('recentActivityReactContainer'));
registerServiceWorker();*/

ReactDOM.render(<Sidebar />, document.getElementById('sideBarReactContainer'));
registerServiceWorker();