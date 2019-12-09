import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import storageUtil from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';
const user = storageUtil.getUser();
memoryUtils.user = user;
ReactDOM.render(<App />, document.getElementById('root'));
