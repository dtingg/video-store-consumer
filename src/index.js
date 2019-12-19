import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App baseUrl="http://localhost:3000/" />, document.getElementById('root'));
registerServiceWorker();
