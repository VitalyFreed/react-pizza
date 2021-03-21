import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App.js';
import {Provider} from 'react-redux';

import store from './store';
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);