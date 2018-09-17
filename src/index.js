import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Body from './body/body';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<Body />, document.getElementById('root'));
registerServiceWorker();
