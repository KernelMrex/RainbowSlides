var app = {
    presentation: presentation,
    history: [], //stack
}

var presentation = {
    name: '',
    slides: [], //linked list
}

var slide = {
    objects: [],  
    background: '', 
}

var text = {
    name: 'Text 1',
    position: {
        x: 0,
        y: 0
    },
    size: {
        width: 1000,    
    },
    background: '#ffffff',
    underline: '1px solid #ffffff'
}

var square = {
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
    lockedAspectRatio: true,
}

var image = {
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
    lockedAspectRatio: true,
}

var file = {
    name: 'File 1',
    position: {
        x: 0,
        y: 0
    },
    size: {
        height: 400,
        width: 1000,    
    },
    scr: 'url',
    lockedAspectRatio: true,
}

var circle = {
    name: 'Circle 1',
    position: {
        x: 0,
        y: 0
    },
    size: {
        radius: 20,
    },
    background: '#ffffff',
    lockedAspectRatio: true,
}

var action = {
    current: null,
    previous: null,
}