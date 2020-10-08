export function updateSlide(presentation: Presentation, newSlide: Slide): Presentation
{
    return {
        ...presentation,
        slides: [...presentation.slides].map((slide: Slide) => slide.id === newSlide.id ? newSlide : slide)
    }
}

export function updateObject(slide: Slide, newObject: SlideObject): Slide
{
    return {
        ...slide,
        objects: [...slide.objects].map((object) => object.id === newObject.id ? newObject : object)
    }
}

export function getSelectedSlide(presentation: Presentation): Slide | null
{
    const selectedSlideID = presentation.selection.slide
    if (selectedSlideID === undefined)
    {
        return null
    }

    const slide = presentation.slides.find((slide: Slide) => slide.id === selectedSlideID)

    return slide !== undefined ? slide : null
}

export function getSelectedObjects(presentation: Presentation): Array<SlideObject> | null
{
    const selectedSlide = getSelectedSlide(presentation)
    if (selectedSlide === null)
    {
        return null
    }

    if (presentation.selection.object === null)
    {
        return null;
    }

    return selectedSlide.objects.filter((object) =>
        selectedSlide.objects
            .map((object) => object.id)
            .includes(object.id)
    );
}

export function getSelected(presentation: Presentation): [Slide | null, Array<SlideObject> | null]
{
    return [getSelectedSlide(presentation), getSelectedObjects(presentation)]
}

