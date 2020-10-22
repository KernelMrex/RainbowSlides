import {
    addSlide,
    changeOrderOfSlide,
    changesSlidesBackground,
    createNewArraySlidesWithNewSlide,
    deleteSlide,
    getDefaultSlide,
    getNewId
} from "../src/core/slides"

let slide1: Slide = {
    id: "f123",
    objects: [],
    background: {
        hex: "#ffffff"
    }
}

let slide2: Slide = {
    id: "f234",
    objects: [],
    background: {
        hex: "#000000"
    }
}

let slide3: Slide = {
    id: "f345",
    objects: [],
    background: {
        hex: "#000000"
    }
}

let presentationWithTwoSlidesNonSelected: Presentation = {
    name: "simple name",
    slides: [slide1, slide2],
    selection: {
        slide: slide2.id,
        objects: []
    }
}

let presentationWithTwoSlidesNonSelectedReverse: Presentation = {
    name: "simple name",
    slides: [slide2, slide1],
    selection: {
        slide: slide2.id,
        objects: []
    }
}

let presentationWithThreeSlidesNonSelected: Presentation = {
    name: "simple name",
    slides: [slide1, slide3, slide2],
    selection: {
        slide: slide3.id,
        objects: []
    }
}

let presentationWithThreeSlidesNonSelectedReverseFirst: Presentation = {
    name: "simple name",
    slides: [slide3, slide1, slide2],
    selection: {
        slide: slide3.id,
        objects: []
    }
}

let presentationWithThreeSlidesNonSelectedReverseLast: Presentation = {
    name: "simple name",
    slides: [slide1, slide2, slide3],
    selection: {
        slide: slide3.id,
        objects: []
    }
}

let presentationWithSlides: Presentation = {
    name: "simple name",
    slides: [slide1],
    selection: {
        slide: slide1.id,
        objects: []
    }
}

let presentationWithoutSelectedSlides: Presentation = {
    name: "simple name",
    slides: [slide1],
    selection: {
        slide: null,
        objects: []
    }
}

describe("tests for module Slides", () => {
    test("add slide with previous", () => {
        let newPresentation: Presentation = addSlide(presentationWithSlides);

        expect(newPresentation.slides.length).toBe(presentationWithSlides.slides.length + 1);
        expect(newPresentation.slides[1].background).toEqual({hex: "#ffffff"});
    });

    test("create default slide", () => {
        expect(getDefaultSlide().background).toEqual({hex: "#ffffff"});
    });

    test("create new id", () => {
        expect(typeof getNewId()).toBe("string");
        expect(getNewId()[0]).toBe("f");
    });


    test("delete alone selected slide", () => {
        let newPresentation: Presentation = deleteSlide(presentationWithSlides);

        expect(newPresentation.slides.length).toEqual(0);
    });

    test("delete alone non selected slide", () => {
        let newPresentation: Presentation = deleteSlide(presentationWithoutSelectedSlides);

        expect(newPresentation).toBe(presentationWithoutSelectedSlides);
    });

    // test("delete not alone selected second slide", () => {
    //     let newPresentation: Presentation = deleteSlide(presentationWithTwoSlidesNonSelected);
    //
    //     expect(newPresentation).toBe(presentationWithSlides);
    // });
    //
    // test("delete not alone selected second slide of three", () => {
    //     let newPresentation: Presentation = deleteSlide(presentationWithThreeSlidesNonSelected);
    //
    //     expect(newPresentation).toBe(presentationWithTwoSlidesNonSelected);
    // });


    test("change bckgr of slide", () => {
        let color: Color = {hex: "#000000"};
        let newPresentation: Presentation = changesSlidesBackground(presentationWithSlides, color);

        expect(newPresentation.slides[0].background).toEqual({hex: "#000000"});
    });

    test("change bckgr of slide !error", () => {
        let color: Color = {hex: "#000000"};
        let newPresentation: Presentation = changesSlidesBackground(presentationWithoutSelectedSlides, color);

        expect(newPresentation).toEqual(presentationWithoutSelectedSlides);
    });


    test("change order non selected slide", () => {
        let newPresentation: Presentation = changeOrderOfSlide(presentationWithoutSelectedSlides, 0);
        expect(newPresentation).toEqual(presentationWithoutSelectedSlides);
    });

    test("change order selected slide alone", () => {
        let newPresentation: Presentation = changeOrderOfSlide(presentationWithSlides, 0);
        expect(newPresentation).toEqual(presentationWithSlides);
    });

    test("change order selected slide non alone", () => {
        let newPresentation: Presentation = changeOrderOfSlide(presentationWithTwoSlidesNonSelected, 0);
        expect(newPresentation).toEqual(presentationWithTwoSlidesNonSelectedReverse);
    });

    test("change order selected slide non alone at the same place", () => {
        let newPresentation: Presentation = changeOrderOfSlide(presentationWithTwoSlidesNonSelected, 1);
        expect(newPresentation).toEqual(presentationWithTwoSlidesNonSelected);
    });

    test("change order selected slide non alone at the wrond place", () => {
        let newPresentation: Presentation = changeOrderOfSlide(presentationWithTwoSlidesNonSelected, 3);
        expect(newPresentation).toEqual(presentationWithTwoSlidesNonSelected);
    });

    test("change order middle slide for first slide", () => {
        let newPresentation: Presentation = changeOrderOfSlide(presentationWithThreeSlidesNonSelected, 0);
        expect(newPresentation).toEqual(presentationWithThreeSlidesNonSelectedReverseFirst);
    });

    test("change order middle slide for last slide", () => {
        let newPresentation: Presentation = changeOrderOfSlide(presentationWithThreeSlidesNonSelected, 2);
        expect(newPresentation).toEqual(presentationWithThreeSlidesNonSelectedReverseLast);
    });
})