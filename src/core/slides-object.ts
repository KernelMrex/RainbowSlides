import { Anchor, Font, Presentation, Slide, SlideObject } from '../types';

export function addObjectToSlide(presentation: Presentation, slideID: string, object: SlideObject): Presentation
{
    const slide = presentation.slides.find((slide: Slide) => slide.id === slideID)
    if (slide === undefined)
    {
        return presentation
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
        return presentation
    }

    return updateSlide(presentation, {
        ...slide,
        objects: [...slide.objects].filter((object: SlideObject) => object.id !== objectID)
    })
}

export function changeObjectName(presentation: Presentation, newName: string): Presentation
{
    const [slide, [selectedObject]] = getSelected(presentation)
    if (slide === null || selectedObject === undefined)
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        name: newName,
    }))
}

export function changeObjectPosition(presentation: Presentation, newPosition: Anchor): Presentation
{
    const [slide, [selectedObject]] = getSelected(presentation)
    if (slide === null || selectedObject === undefined)
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        position: newPosition,
    }))
}

export function changeTextFont(presentation: Presentation, newFont: Font): Presentation
{
    const [slide, [selectedObject]] = getSelected(presentation)
    if (slide === null || selectedObject === undefined || selectedObject.type !== 'text')
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        font: newFont,
    }))
}

export function changeTextContent(presentation: Presentation, newContent: string): Presentation
{
    const [slide, [selectedObject]] = getSelected(presentation)
    if (slide === null || selectedObject === undefined || selectedObject.type !== 'text')
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        content: newContent
    }))
}

export function changeMediaSource(presentation: Presentation, newSource: string): Presentation
{
    const [slide, [selectedObject]] = getSelected(presentation)
    if (slide === null || selectedObject === undefined || !['media', 'image'].includes(selectedObject.type))
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        source: newSource,
    }))
}

export function changeObjectSize(presentation: Presentation, newWidth: number | null, newHeight: number | null): Presentation
{
    const [slide, [selectedObject]] = getSelected(presentation)
    if (slide === null || selectedObject === undefined)
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        width: newWidth === null ? selectedObject.width : newWidth,
        height: newHeight === null ? selectedObject.height : newHeight,
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