import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as type from './core/types';
import src from './src'

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
    source: src,
    background: {
        hex: '#ffffff'
    }
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
    background: {
        hex: '#fa71d3'
    }
}

const simpleCircle: type.CircleBlock = {
    id: 'f125',
    type: 'circle',
    name: 'circle',
    position: {
        x: 150,
        y: 100
    },
    height: 300,
    width: 200,
    background: {
        hex: '#f2331b'
    }
}

const simpleTriangle: type.TriangleBlock = {
    id: 'f125',
    type: 'triangle',
    name: 'circle',
    position: {
        x: 650,
        y: 450
    },
    height: 200,
    width: 200,
    background: {
        hex: '#046d06'
    }
}

const slide1: type.Slide = {
    id: 'f321',
    objects: [ picture, simpleRectangle, simpleCircle, simpleTriangle ],
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
