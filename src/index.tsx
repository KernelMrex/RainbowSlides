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

const simpleRectangle: type.RectangleBlock = {
    id: 'f124',
    type: 'rectangle',
    name: 'rectangle',
    position: {
        x: 200,
        y: 200
    },
    height: 213,
    width: 321,
}

const simpleCircle: type.CircleBlock = {
    id: 'f125',
    type: 'circle',
    name: 'circle',
    position: {
        x: 200,
        y: 200
    },
    height: 213,
    width: 321,
    radius: 12
}

const slide1: type.Slide = {
    id: 'f321',
    objects: [ picture, simpleRectangle, simpleCircle ],
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
        slide: slide1.id,
        objects: []
    }
}

ReactDOM.render(
    <React.StrictMode>
        <App presentation={presentation}/>
    </React.StrictMode>,
    document.getElementById('root')
);
