import {
    selectObject,
    selectSlide,
    deleteSlideFromSelection,
    deleteObjectFromSelection
} from "../src/modules/selection";

let picture: ImageBlock = {
    id: 'f123',
    type: 'image',
    name: 'Sasha',
    position: {
        x: 12,
        y: 23
    },
    height: 213,
    width: 321,
    source: 'url'
};

let simpleCircle: CircleBlock = {
    id: 'f124',
    type: 'image',
    name: 'Sasha',
    position: {
        x: 12,
        y: 23
    },
    height: 213,
    width: 321,
    radius: 12
};

let slide1: Slide = {
    id: 'f321',
    objects: [picture, simpleCircle],
    background: {
        source: "url"
    }
};

let slide2: Slide = {
    id: 'f421',
    objects: [picture],
    background: {
        hex: "#ffffff"
    }
};

let presentationWithoutSelectedSlide: Presentation = {
    name: "name1",
    slides: [slide1],
    selection: {
        slide: null,
        object: []
    }
};

let presentationWithoutSelectedObject: Presentation = {
    name: "name3",
    slides: [slide1],
    selection: {
        slide: slide1.id,
        object: []
    }
};

let presentationWithSelectedSlide: Presentation = {
    name: "name2",
    slides: [slide1, slide2],
    selection: {
        slide: slide1.id,
        object: [picture.id]
    }
};

describe('test module "Selection"', () => {
    test('select slide without previous', () => {
        let newPresentation: Presentation = selectSlide(presentationWithoutSelectedSlide, slide1);
        expect(newPresentation).toEqual({
            ...presentationWithoutSelectedSlide,
            selection: {
                slide: slide1.id,
                object: []
            }
        })
    });

    test('select slide with already selected slide', () => {
        let newPresentation: Presentation = selectSlide(presentationWithSelectedSlide, slide2);
        expect(newPresentation).toEqual({
            ...presentationWithSelectedSlide,
            selection: {
                slide: slide2.id,
                object: []
            }
        })
    });

    test('delete slide with selected slide', () => {
        let newPresentation: Presentation = deleteSlideFromSelection(presentationWithSelectedSlide);
        expect(newPresentation).toEqual({
            ...presentationWithSelectedSlide,
            selection: {
                slide: null,
                object: []
            }
        })
    });

    test('select object without already selected object', () => {
        let selectedSlideId = presentationWithoutSelectedObject.selection.slide;
        let selectedSlide: Slide = presentationWithoutSelectedObject.slides.filter(slide => slide.id === selectedSlideId)[0];
        let newSelectedObjectId: string = selectedSlide.objects.filter(object => object.id === simpleCircle.id)[0].id;

        let newPresentation: Presentation = selectObject(presentationWithoutSelectedObject, newSelectedObjectId);
        expect(newPresentation).toEqual({
            ...presentationWithoutSelectedObject,
            selection: {
                ...presentationWithoutSelectedObject.selection,
                object: [newSelectedObjectId]
            }
        })
    });

    test('select object with already selected object', () => {
        let selectedSlideId: string | null = presentationWithSelectedSlide.selection.slide;
        let selectedSlide: Slide = presentationWithSelectedSlide.slides.filter(slide => slide.id === selectedSlideId)[0];
        let newSelectedObjectId: string = selectedSlide.objects.filter(object => object.id === simpleCircle.id)[0].id;
        
        let newPresentation: Presentation = selectObject(presentationWithSelectedSlide, newSelectedObjectId);
        expect(newPresentation).toEqual({
            ...presentationWithSelectedSlide,
            selection: {
                ...presentationWithSelectedSlide.selection,
                object: [...presentationWithSelectedSlide.selection.object, newSelectedObjectId]
            }
        })
    });

    test('delete object with already selected object', () => {
        let selectedSlideId: string | null = presentationWithSelectedSlide.selection.slide;
        let selectedSlide: Slide = presentationWithSelectedSlide.slides.filter(slide => slide.id === selectedSlideId)[0];
        let newSelectedObjectId: string = selectedSlide.objects.filter(object => object.id === simpleCircle.id)[0].id;
        
        let newSelectedObjects: Array<string> = presentationWithSelectedSlide.selection.object.filter(object => object !== newSelectedObjectId)
        let newPresentation: Presentation = deleteObjectFromSelection(presentationWithSelectedSlide, newSelectedObjectId);
        expect(newPresentation).toEqual({
            ...presentationWithSelectedSlide,
            selection: {
                ...presentationWithSelectedSlide.selection,
                object: newSelectedObjects
            }
        })
    });
});