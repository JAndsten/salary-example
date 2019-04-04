import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PayrollApp from './PayrollApp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<PayrollApp />, document.getElementById('root'));

serviceWorker.register();
