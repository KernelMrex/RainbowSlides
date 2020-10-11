import {
    selectObject,
    selectSlide,
    deleteSlideFromSelection,
    deleteObjectFromSelection
} from "../src/modules/selection";

let slide1: Slide = {
    id: 'f123',
    objects: [],
    background: {
        source: 'url'
    }
};
let presentation: Presentation = {
    name: 'name',
    slides: [slide1],
    selection: {
        slide: null,
        object: null
    }
};

describe('test module "Selection"', () => {
    test('select slide without previous', () => {
        let newPresentation: Presentation = selectSlide(presentation, slide1);
        expect(newPresentation).toEqual({
            ...presentation,
            selection: {
                slide: slide1.id,
                object: null
            }
        })
    });
});