import { Presentation, Slide, SlideObject, Picture, Color } from '../types'
import { deleteSlideFromSelection } from '../selection/selection';

function addSlide(presentation: Presentation, slide: Slide = getDefaultSlide()): Presentation
{
    return {
        ...presentation,
        slides: [ ...presentation.slides, slide ]
    }
}

function getDefaultSlide(): Slide
{
    const slideObjects: Array<SlideObject> = [];
    return {
        id: getNewId(),
        objects: slideObjects,
        background: {
            hex: '#ffffff'
        }
    }
}

function deleteSlide(presentation: Presentation): Presentation
{
    const currentSlideId: string | null = presentation.selection.slide;
    if (currentSlideId !== null)
    {
        let newPresentation: Presentation = { ...presentation };
        newPresentation = deleteSlideFromSelection(newPresentation);
        const currentSlide: Slide = presentation.slides.filter(slide => slide.id === currentSlideId)[0];
        let newSlidesList: Array<Slide> = [ ...presentation.slides ];
        newSlidesList.splice(presentation.slides.indexOf(currentSlide), 1);

        return {
            ...newPresentation,
            slides: newSlidesList
        }
    }

    return presentation;
}

function getNewId(): string
{
    return `f${(~~(Math.random() * 1e8)).toString(16)}`;
}

function changeOrderOfSlide(presentation: Presentation, place: number): Presentation
{
    if (presentation.selection.slide !== null && presentation.slides.length >= place)
    {
        const currentSlide: Slide = presentation.slides.filter(slide => slide.id === presentation.selection.slide)[0];
        let newSlidesList: Array<Slide> = [ ...presentation.slides ];
        newSlidesList.splice(presentation.slides.indexOf(currentSlide), 1);
        newSlidesList.splice(place, 0, currentSlide);

        return {
            ...presentation,
            slides: newSlidesList
        }
    }
    return presentation;
}

function changesSlidesBackground(presentation: Presentation, background: Picture | Color): Presentation
{
    if (presentation.selection.slide !== null)
    {
        const currentSlide: Slide = presentation.slides.filter(slide => slide.id === presentation.selection.slide)[0]
        const newSlide: Slide = {
            ...currentSlide,
            background: background
        };

        const slides: Array<Slide> = createNewArraySlidesWithNewSlide(presentation, newSlide);
        return {
            ...presentation,
            slides: slides,
        }
    }
    else
    {
        return presentation
    }
}

function createNewArraySlidesWithNewSlide(presentation: Presentation, newSlide: Slide): Array<Slide>
{
    if (presentation.selection.slide !== null)
    {
        const currentSlide: Slide = presentation.slides.filter(slide => slide.id === presentation.selection.slide)[0];
        const currentSlideKey: number = presentation.slides.indexOf(currentSlide);
        let newArraySlide: Array<Slide> = [ ...presentation.slides ];
        newArraySlide.splice(currentSlideKey, 1, newSlide);
        return newArraySlide;
    }
    else
    {
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

