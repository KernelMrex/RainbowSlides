import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as type from './core/types';

let presentation: type.Presentation = {
    name: 'my first presentation',
    slides: [],
    selection: {
        slide: null,
        objects: []
    }
}


ReactDOM.render(
    <React.StrictMode>
        <App presentation={presentation}/>
    </React.StrictMode>,
    document.getElementById('root')
);
