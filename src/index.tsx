import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as type from './core/types';

const picture: type.ImageBlock = {
    id: 'f123',
    type: 'image',
    name: 'Toronto',
    position: {
        x: 12,
        y: 23
    },
    height: 213,
    width: 321,
    source: 'url'
}

const simpleCircle: type.CircleBlock = {
    id: 'f124',
    type: 'circle',
    name: 'Circle',
    position: {
        x: 12,
        y: 23
    },
    height: 213,
    width: 321,
    radius: 12
}

const slide1: type.Slide = {
    id: 'f321',
    objects: [ picture, simpleCircle ],
    background: {
        source: 'url'
    }
}

const slide2: type.Slide = {
    id: 'f421',
    objects: [ picture ],
    background: {
        hex: '#ffffff'
    }
}

const presentation: type.Presentation = {
    name: 'my first presentation',
    slides: [slide1, slide2],
//    slides: [],
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
