import { Presentation, Slide, SlideObject } from '../types'

export type SelectSlidePayload = {
    slide: Slide
}

export function selectSlide(presentation: Presentation, payload: SelectSlidePayload): Presentation
{
    return {
        ...presentation,
        selection: {
            slide: payload.slide.id,
            objects: []
        }
    }
}

export function deleteSlideFromSelection(presentation: Presentation): Presentation
{
    return {
        ...presentation,
        selection: {
            slide: null,
            objects: []
        }
    }
}

export type SelectObjectPayload = {
    objectId: string
}

export function selectObject(presentation: Presentation, payload: SelectObjectPayload): Presentation
{
    const selectedSlide: Slide | null = getSelectedSlide(presentation);
    if (selectedSlide === null || selectedSlide.objects.find((object) => object.id === payload.objectId) === undefined)
    {
        return presentation
    }

    if (presentation.selection.slide !== null)
    {
        let objects: Array<string>
        let currentSlide: Slide = presentation.slides.filter(slide => slide.id === presentation.selection.slide)[0]

        if (presentation.selection.objects !== [])
        {
            objects = [...presentation.selection.objects]
        } else
        {
            objects = []
        }

        if (payload.objectId === currentSlide.objects.filter(object => object.id === payload.objectId)[0].id)
        {
            objects.push(payload.objectId)
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

export type DeleteObjectFromSelectionPayload = {
    objectId: string
}

export function deleteObjectFromSelection(presentation: Presentation, payload: DeleteObjectFromSelectionPayload): Presentation
{
    if (presentation.selection.objects !== [])
    {
        let objects: Array<string> = [ ...presentation.selection.objects ]
        objects.splice(presentation.selection.objects.indexOf(payload.objectId), 1)
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

export function deleteAllObjectsFromSelection(presentation: Presentation): Presentation
{
    return {
        ...presentation,
        selection: {
            ...presentation.selection,
            objects: []
        }
    }
}

export function getSelectedSlide(presentation: Presentation): Slide | null
{
    const selectedSlideID = presentation.selection.slide
    if (!selectedSlideID)
    {
        return null
    }

    const slide = presentation.slides.find((slide: Slide) => slide.id === selectedSlideID)

    return slide ? slide : null
}

export function getSelectedObjects(presentation: Presentation): Array<SlideObject>
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

export function getSelected(presentation: Presentation): [ Slide | null, Array<SlideObject> ]
{
    return [ getSelectedSlide(presentation), getSelectedObjects(presentation) ]
}