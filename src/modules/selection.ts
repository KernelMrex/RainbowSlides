function selectSlide(presentation: Presentation, slide: Slide): Presentation
{
    return {
        ...presentation,
        selection: {
            slide: slide,
            object: null
        }
    }
}

function deleteSlideFromSelection(presentation: Presentation): Presentation
{
    return {
        ...presentation,
        selection: {
            slide: null,
            object: null
        }
    }
}

function selectObject(presentation: Presentation, object: SlidesObject): Presentation
{
    return {
        ...presentation,
        selection: {
            ...presentation.selection,
            object: object
        }
    }
}

function deleteObjectFromSelection(presentation: Presentation, object: SlidesObject): Presentation
{
    return {
        ...presentation,
        selection: {
            ...presentation.selection,
            object: null
        }
    }
}