import {
    changePresentationsName,
    createPresentation,
    deletePresentation,
    getJSONOfPresentation,
    getPresentationFromJSON
} from "./presentation";
let slide1: Slide = {
    id: 'f123',
    objects: [],
    background: {
        source: 'url'
    }
};
let newPresentation: Presentation = {
    name: 'name',
    slides: [slide1],
    selection: {
        slide: null,
        objects: []
    }
};
describe('test module "Presentation"', () => {
    test('get new presentation', () => {
        let newPresentation: Presentation = createPresentation("How to grow up");
        expect(newPresentation).toEqual({
            name: "How to grow up",
            slides: [],
            selection: {
                slide: null,
                objects: []
            }
        })
    });

    test('delete old presentation', () => {
        newPresentation = deletePresentation();
        expect(newPresentation).toEqual({
            name: "simple name",
            slides: [],
            selection: {
                slide: null,
                objects: []
            }
        })
    });

    test('get json of presentation', () => {
        let expectedJSON = JSON.stringify(newPresentation);
        expect(getJSONOfPresentation(newPresentation)).toEqual(expectedJSON)
    });

    test('get presentation from object', () => {
        let PresentationJSON: string = JSON.stringify(newPresentation);
        expect(getPresentationFromJSON(PresentationJSON)).toEqual(newPresentation)
    });

    test('change name of presentation on right name', () => {
        let newNamedPresentation: Presentation = changePresentationsName(newPresentation, 'test')
        expect(newNamedPresentation).toEqual({
            ...newPresentation,
            name: 'test'
        })
    });
});
