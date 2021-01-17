import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as type from './core/types';
import src from './src'
import {bindKeys} from './common/bindKeys'
import {setState} from './state/state-manager';
import { store } from './store/store';
import { Provider } from 'react-redux';

//setState(presentation)
//bindKeys()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
