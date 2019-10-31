import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Root from './components/Root';
import Store from './store';
import './index.css';

ReactDOM.render(
    <Provider store={Store}>
        <Root/>
    </Provider>,
    document.getElementById('caro')
);