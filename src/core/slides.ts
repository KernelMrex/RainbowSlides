function addSlide(presentation: Presentation): Presentation {
    return {
        ...presentation,
        slides: [...presentation.slides, getDefaultSlide()]
    }
}

function getDefaultSlide(): Slide {
    let slideObjects: Array<SlideObject> = [];
    return {
        id: getNewId(),
        objects: slideObjects,
        background: {
            hex: "#ffffff"
        }
    }
}

function deleteSlide(presentation: Presentation): Presentation {
    let currentSlideId: string | null = presentation.selection.slide;
    if (currentSlideId !== null) {
        let currentSlide: Slide = presentation.slides.filter(slide => slide.id == currentSlideId)[0];
        let newSlidesList: Array<Slide> = [...presentation.slides];
        newSlidesList.splice(presentation.slides.indexOf(currentSlide), 1);

        return {
            ...presentation,
            slides: newSlidesList
        }
    }

    return presentation;
}

function getNewId(): string {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`;
}

function changeOrderOfSlide(presentation: Presentation, place: number): Presentation {
    if (presentation.selection.slide !== null && presentation.slides.length >= place) {
        let currentSlide: Slide = presentation.slides.filter(slide => slide.id == presentation.selection.slide)[0];
        let newSlidesList: Array<Slide> = [...presentation.slides];
        newSlidesList.splice(presentation.slides.indexOf(currentSlide), 1);
        newSlidesList.splice(place, 0, currentSlide);

        return {
            ...presentation,
            slides: newSlidesList
        }
    }
    return presentation;
}

function changesSlidesBackground(presentation: Presentation, background: Picture | Color): Presentation {
    if (presentation.selection.slide !== null) {
        let currentSlide: Slide = presentation.slides.filter(slide => slide.id == presentation.selection.slide)[0]
        let newSlide: Slide = {
            ...currentSlide,
            background: background
        };

        let slides: Array<Slide> = createNewArraySlidesWithNewSlide(presentation, newSlide);
        return {
            ...presentation,
            slides: slides,
        }
    } else {
        return presentation
    }
}

function createNewArraySlidesWithNewSlide(presentation: Presentation, newSlide: Slide): Array<Slide> {
    if (presentation.selection.slide !== null) {
        let currentSlide: Slide = presentation.slides.filter(slide => slide.id == presentation.selection.slide)[0];
        let currentSlideKey: number = presentation.slides.indexOf(currentSlide);
        let newArraySlide: Array<Slide> = [...presentation.slides];
        newArraySlide.splice(currentSlideKey, 1, newSlide);
        return newArraySlide;
    } else {
        return presentation.slides
    }
}

export {
    changeOrderOfSlide,
    addSlide,
    changesSlidesBackground,
    createNewArraySlidesWithNewSlide,
    deleteSlide,
    getDefaultSlide,
    getNewId
};

