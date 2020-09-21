var app = {
    presentation: presentation,
    history: [],
}

var presentation = {
    name: '',
    description: 'description here',
    slides: [],
}

var slide = {
    objects: [],  
    background: '', 
    description: 'description here', 
}

var object = {
    name: 'Text 1',
    type: 'text',
    params: {},
}

var textObjectParams = {
    position: [0, 0],
    background: '#ffffff',
    underline: '1px solid #ffffff'
}

var squareObjectParams = {
    position: [0, 0],
    background: '#ffffff',
    lockedAspectRatio: true,
    height: 400,
    width: 1000,
}

var action = {
    currencObject: null,
    previousObject: null,
}