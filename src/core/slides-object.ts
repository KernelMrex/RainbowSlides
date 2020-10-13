export function addObjectToSlide(presentation: Presentation, slideID: string, object: SlideObject): Presentation
{
    const slide = presentation.slides.find((slide: Slide) => slide.id === slideID)
    if (slide === undefined)
    {
        return presentation;
    }

    return updateSlide(presentation, {
        ...slide,
        objects: [...slide.objects, object]
    })
}

export function removeObjectFromSlide(presentation: Presentation, slideID: string, objectID: string): Presentation
{
    const slide = presentation.slides.find((slide: Slide) => slide.id === slideID)
    if (slide === undefined)
    {
        return presentation;
    }

    return updateSlide(presentation, {
        ...slide,
        objects: [...slide.objects].filter((object: SlideObject) => object.id !== objectID)
    })
}

export function changeObjectName(presentation: Presentation, newName: string): Presentation
{
    const [slide, objects] = getSelected(presentation)
    if (slide === null || objects === null || objects.length !== 1)
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...objects[0],
        name: newName,
    }))
}

export function changeObjectPosition(presentation: Presentation, newPosition: Anchor): Presentation
{
    const [slide, objects] = getSelected(presentation)
    if (slide === null || objects === null || objects.length !== 1)
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...objects[0],
        position: newPosition,
    }))
}

function updateSlide(presentation: Presentation, newSlide: Slide): Presentation
{
    return {
        ...presentation,
        slides: [...presentation.slides].map((slide: Slide) => slide.id === newSlide.id ? newSlide : slide)
    }
}

function updateObject(slide: Slide, newObject: SlideObject): Slide
{
    return {
        ...slide,
        objects: [...slide.objects].map((object: SlideObject) => object.id === newObject.id ? newObject : object)
    }
}

function getSelectedSlide(presentation: Presentation): Slide | null
{
    const selectedSlideID = presentation.selection.slide
    if (selectedSlideID === undefined)
    {
        return null
    }

    const slide = presentation.slides.find((slide: Slide) => slide.id === selectedSlideID)

    return slide !== undefined ? slide : null
}

function getSelectedObjects(presentation: Presentation): Array<SlideObject>
{
    const selectedSlide = getSelectedSlide(presentation)
    if (selectedSlide === null || presentation.selection.objects === null)
    {
        return []
    }

    return selectedSlide.objects.filter(
        (object: SlideObject) => presentation.selection.objects.includes(object.id)
    )
}

function getSelected(presentation: Presentation): [Slide | null, Array<SlideObject>]
{
    return [getSelectedSlide(presentation), getSelectedObjects(presentation)]
}