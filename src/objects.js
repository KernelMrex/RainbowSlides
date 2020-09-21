var Presentation = {
    name: 'Name of presentation',
    slidesList: Slides,
    history: CommandHistory
};

var Slides = {
    slide: SlidesList,
    background: 'default' // перечесление
};

var Slide = {
    object: ObjectsList
};

var SlidesObject = {
    type: "Object's type",
    params: ListOfParams,
    uniqueParams: ListOfUniqueParams
};

var CommandHistory = {
    changes: ChangesStack
};

var Change = {
    action: 'sm action',
    object: objectReference
};

var SlidesList = []; //Slides

var ObjectsList = [];

var ListOfParams = {
    size: 123,
    position: (123, 123) //corteju
};

var ListOfUniqueParams = {
    font: 12,
    src: 'url'
};

var ChangesStack = [];

var objectReference; 


console.log('alright');