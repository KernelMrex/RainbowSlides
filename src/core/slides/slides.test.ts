import {
    addSlide,
    changeOrderOfSlide,
    changesSlidesBackground,
    createNewArraySlidesWithNewSlide,
    deleteSlide,
    getDefaultSlide,
    getNewId
} from './slides'

import { CircleBlock, ImageBlock, Presentation, Slide, Color } from '../types'

const slide1: Slide = {
    id: 'f123',
    objects: [],
    background: {
        hex: '#ffffff'
    }
}

const slide2: Slide = {
    id: 'f234',
    objects: [],
    background: {
        hex: '#000000'
    }
}

const slide3: Slide = {
    id: 'f345',
    objects: [],
    background: {
        hex: '#000000'
    }
}

const presentationWithTwoSlidesNonSelected: Presentation = {
    name: 'simple name',
    slides: [slide1, slide2],
    selection: {
        slide: null,
        objects: []
    }
}

const presentationWithTwoSlidesSelected: Presentation = {
    name: 'simple name',
    slides: [slide1, slide2],
    selection: {
        slide: slide2.id,
        objects: []
    }
}

const presentationWithTwoSlidesNonSelectedReverse: Presentation = {
    name: 'simple name',
    slides: [slide2, slide1],
    selection: {
        slide: slide2.id,
        objects: []
    }
}

const presentationWithThreeSlidesNonSelected: Presentation = {
    name: 'simple name',
    slides: [slide1, slide3, slide2],
    selection: {
        slide: null,
        objects: []
    }
}

const presentationWithThreeSlidesSelected: Presentation = {
    name: 'simple name',
    slides: [slide1, slide3, slide2],
    selection: {
        slide: slide3.id,
        objects: []
    }
}

const presentationWithThreeSlidesNonSelectedReverseFirst: Presentation = {
    name: 'simple name',
    slides: [slide3, slide1, slide2],
    selection: {
        slide: slide3.id,
        objects: []
    }
}

const presentationWithThreeSlidesNonSelectedReverseLast: Presentation = {
    name: 'simple name',
    slides: [slide1, slide2, slide3],
    selection: {
        slide: slide3.id,
        objects: []
    }
}

const presentationWithSlides: Presentation = {
    name: 'simple name',
    slides: [slide1],
    selection: {
        slide: slide1.id,
        objects: []
    }
}

const presentationWithoutSelectedSlides: Presentation = {
    name: 'simple name',
    slides: [slide1],
    selection: {
        slide: null,
        objects: []
    }
}

describe('tests for module Slides', () => {
    test('add slide with previous', () => {
        const newPresentation: Presentation = addSlide(presentationWithSlides);

        expect(newPresentation.slides.length).toBe(presentationWithSlides.slides.length + 1);
        expect(newPresentation.slides[1].background).toEqual({hex: '#ffffff'});
    });

    test('create default slide', () => {
        expect(getDefaultSlide().background).toEqual({hex: '#ffffff'});
    });

    test('create new id', () => {
        expect(typeof getNewId()).toBe('string');
        expect(getNewId()[0]).toBe('f');
    });


    test('delete alone selected slide', () => {
        const newPresentation: Presentation = deleteSlide(presentationWithSlides);

        expect(newPresentation.slides.length).toEqual(0);
    });

    test('delete alone non selected slide', () => {
        const newPresentation: Presentation = deleteSlide(presentationWithoutSelectedSlides);

        expect(newPresentation).toBe(presentationWithoutSelectedSlides);
    });

    test('delete not alone selected second slide', () => {
        const newPresentation: Presentation = deleteSlide(presentationWithTwoSlidesSelected);

        expect(newPresentation).toStrictEqual(presentationWithoutSelectedSlides);
    });

    test('delete not alone selected second slide of three', () => {
        const newPresentation: Presentation = deleteSlide(presentationWithThreeSlidesSelected);

        expect(newPresentation).toStrictEqual(presentationWithTwoSlidesNonSelected);
    });


    test('change bckgr of slide', () => {
        const color: Color = {hex: '#000000'};
        const newPresentation: Presentation = changesSlidesBackground(presentationWithSlides, color);

        expect(newPresentation.slides[0].background).toEqual({hex: '#000000'});
    });

    test('change bckgr of slide !error', () => {
        const color: Color = {hex: '#000000'};
        const newPresentation: Presentation = changesSlidesBackground(presentationWithoutSelectedSlides, color);

        expect(newPresentation).toEqual(presentationWithoutSelectedSlides);
    });


    test('change order non selected slide', () => {
        const newPresentation: Presentation = changeOrderOfSlide(presentationWithoutSelectedSlides, 0);
        expect(newPresentation).toEqual(presentationWithoutSelectedSlides);
    });

    test('change order selected slide alone', () => {
        const newPresentation: Presentation = changeOrderOfSlide(presentationWithSlides, 0);
        expect(newPresentation).toEqual(presentationWithSlides);
    });

    test('change order selected slide non alone', () => {
        const newPresentation: Presentation = changeOrderOfSlide(presentationWithTwoSlidesSelected, 0);
        expect(newPresentation).toEqual(presentationWithTwoSlidesNonSelectedReverse);
    });

    test('change order selected slide non alone at the same place', () => {
        const newPresentation: Presentation = changeOrderOfSlide(presentationWithTwoSlidesSelected, 1);
        expect(newPresentation).toEqual(presentationWithTwoSlidesSelected);
    });

    test('change order selected slide non alone at the wrond place', () => {
        const newPresentation: Presentation = changeOrderOfSlide(presentationWithTwoSlidesSelected, 3);
        expect(newPresentation).toEqual(presentationWithTwoSlidesSelected);
    });

    test('change order middle slide for first slide', () => {
        const newPresentation: Presentation = changeOrderOfSlide(presentationWithThreeSlidesSelected, 0);
        expect(newPresentation).toEqual(presentationWithThreeSlidesNonSelectedReverseFirst);
    });

    test('change order middle slide for last slide', () => {
        const newPresentation: Presentation = changeOrderOfSlide(presentationWithThreeSlidesSelected, 2);
        expect(newPresentation).toEqual(presentationWithThreeSlidesNonSelectedReverseLast);
    });
})