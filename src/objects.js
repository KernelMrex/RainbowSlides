var Presentation = {
    name: 'Name of presentation',
    slidesList: Slides,
    history: CommandHistory
};

var Slides = {
    slide: SlidesList,
    background: 'ffffff' // slide
};

var Slide = {
    object: ObjectsList,
    priority: 2
};

var Objects = {
    type: "Object's type", // enumeration
    params: ListOfParams,
    uniqueParams: ListOfUniqueParams
};

var CommandHistory = {
    changes: ChangesStack
};

var Change = {
    action: 'some action',
    object: objectReference
};

var SlidesList = []; //linkedList

var ObjectsList = [];

var ListOfParams = {
    size: 123, // function getSize(pointers)
    position: pointers
};

var ListOfUniqueParams = {
    font: 12,
    src: 'url'
};

var pointers = { // huinya
    x: 12,
    y: 21
}

var ChangesStack = []; //Changes

var objectReference; 


console.log('alright');

//small