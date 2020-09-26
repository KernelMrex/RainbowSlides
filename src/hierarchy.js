var app = {
    presentation: presentation,
    history: [], 
}

var presentation = {
    name: '',
    slides: [],
    selection: {
        slide: slide,
        object: object
    }
}

var slide = {
    id: 'sadaw213sadawd',
    objects: [],  
    background: ''
}

var text = {
    id: 'sadaw213sadawd',
    type: 'text',
    name: 'Text 1',
    position: {
        x: 0,
        y: 0
    },
    size: {
        height: 1000,
        width: 1000,    
    },
    background: '#ffffff',
    decor: {
        font: 'Arial',
        color: '#ffffff',
        fontSize: 12
    }
}

var square = {
    id: 'sadaw213sadawd',
    type: 'square',
    name: 'Square 1',
    position: {
        x: 0,
        y: 0
    },
    size: {
        height: 400,
        width: 1000,    
    },
    background: '#ffffff',
}

var image = {
    id: 'sadaw213sadawd',
    type: 'image',
    name: 'Image 1',
    position: {
        x: 0,
        y: 0
    },
    size: {
        height: 400,
        width: 1000,    
    },
    scr: 'url',
}

var animation = { 
    id: 'sadaw213sadawd',
    type: 'animation', 
    name: 'Animation 1',
    position: {
        x: 0,
        y: 0
    },
    size: {
        height: 400,
        width: 1000,    
    },
    scr: 'url',
}

var circle = {
    id: 'sadaw213sadawd',
    name: 'Circle 1',
    position: {
        x: 0,
        y: 0
    },
    radius: 20,
    background: '#ffffff',
}

var action = {
    previous: null
}
