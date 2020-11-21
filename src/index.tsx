import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as type from './core/types';
import src from './src'

const textFor1: type.TextBlock = {
    id: 'f134',
    type: 'text',
    name: 'test1',
    position: {
        x: 870,
        y: 2
    },
    height: 700,
    width: 400,
    color: {
        hex: '#ecf2d7'
    },
    content: 'Смотрите, кто тут у нас спрятался. ' +
        'А, это же пример текста. Круто!',
    font: {
        family: 'Comic Sans MS',
        size: 30,
        weight: 500,
        style: 'none'
    },
    background: {
        hex: '#00004f'
    }
}

const textFor2: type.TextBlock = {
    id: 'f135',
    type: 'text',
    name: 'test1',
    position: {
        x: 70,
        y: 2
    },
    height: 700,
    width: 1200,
    color: {
        hex: '#000000'
    },
    content: 'ААА, выпустите их этого маленького прямоугольника. Контрл зет, контрл зеет!!!! Почему не работает?!!',
    font: {
        family: 'Comic Sans MS',
        size: 60,
        weight: 500,
        style: 'none'
    },
    background: {
        hex: 'none'
    }
}

const picture: type.ImageBlock = {
    id: 'f123',
    type: 'image',
    name: 'Toronto',
    position: {
        x: 500,
        y: 23
    },
    height: 500,
    width: 360,
    source: src,
    background: {
        hex: '#ffffff'
    }
}

const picture2: type.ImageBlock = {
    id: 'f128',
    type: 'image',
    name: 'Toronto2',
    position: {
        x: 600,
        y: 300
    },
    height: 256,
    width: 256,
    source: 'https://at-cdn-s02.audiotool.com/2018/12/12/documents/n1f68tt0/0/cover256x256-3b54774168b54f3ead1d00ea2cc0908a.jpg',
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
    id: 'f126',
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
    objects: [ picture, simpleRectangle, simpleCircle, simpleTriangle, textFor1 ],
    background: {
        hex: '#d2508b'
    }
}

const slide2: type.Slide = {
    id: 'f421',
    objects: [ picture2, textFor2 ],
    background: {
        hex: '#a2ee9a'
    }
}

const presentation: type.Presentation = {
    name: 'my first presentation',
    slides: [slide1, slide2],
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
