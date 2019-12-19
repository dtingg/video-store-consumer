import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App baseUrl="wss://bkr-video-api.herokuapp.com"/>, document.getElementById('root'));
registerServiceWorker();
