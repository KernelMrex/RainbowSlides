import { Presentation, Slide, SlideObject } from '../types'

function selectSlide(presentation: Presentation, slide: Slide): Presentation
{
    return {
        ...presentation,
        selection: {
            slide: slide.id,
            objects: []
        }
    }
}

function deleteSlideFromSelection(presentation: Presentation): Presentation
{
    return {
        ...presentation,
        selection: {
            slide: null,
            objects: []
        }
    }
}

function selectObject(presentation: Presentation, objectId: string): Presentation
{
    if (presentation.selection.slide !== null)
    {
        let objects: Array<string>
        let currentSlide: Slide = presentation.slides.filter(slide => slide.id === presentation.selection.slide)[0]

        if (presentation.selection.objects !== [])
        {
            objects = [ ...presentation.selection.objects ]
        }
        else
        {
            objects = []
        }

        if (objectId == currentSlide.objects.filter(object => object.id === objectId)[0].id)
        {
            objects.push(objectId)
        }

        return {
            ...presentation,
            selection: {
                ...presentation.selection,
                objects: objects
            }
        }
    }
    else
    {
        return presentation
    }
}

function deleteObjectFromSelection(presentation: Presentation, objectId: string): Presentation
{
    if (presentation.selection.objects !== [])
    {
        let objects: Array<string> = [ ...presentation.selection.objects ]
        objects.splice(presentation.selection.objects.indexOf(objectId), 1)
        return {
            ...presentation,
            selection: {
                ...presentation.selection,
                objects: objects
            }
        }
    }

    return presentation
}

function getSelectedSlide(presentation: Presentation): Slide | null
{
    const selectedSlideID = presentation.selection.slide
    if (!selectedSlideID)
    {
        return null
    }

    const slide = presentation.slides.find((slide: Slide) => slide.id === selectedSlideID)

    return slide ? slide : null
}

function getSelectedObjects(presentation: Presentation): Array<SlideObject>
{
    const selectedSlide = getSelectedSlide(presentation)
    if (!selectedSlide || !presentation.selection.objects)
    {
        return []
    }

    return selectedSlide.objects.filter(
        (object: SlideObject) => presentation.selection.objects.includes(object.id)
    )
}

function getSelected(presentation: Presentation): [ Slide | null, Array<SlideObject> ]
{
    return [ getSelectedSlide(presentation), getSelectedObjects(presentation) ]
}

export {
    selectSlide,
    selectObject,
    deleteObjectFromSelection,
    deleteSlideFromSelection,
    getSelectedSlide,
    getSelectedObjects,
    getSelected
}