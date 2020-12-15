import { Font, Presentation, Slide, SlideObject } from '../types'
import { getSelected } from '../selection/selection'

export type AddObjectToSlidePayload = {
    slideID: string
    object: SlideObject
}

export function addObjectToSlide(presentation: Presentation, payload: AddObjectToSlidePayload): Presentation
{
    const slide = presentation.slides.find((slide: Slide) => slide.id === payload.slideID)
    if (!slide)
    {
        return presentation
    }

    return updateSlide(presentation, {
        ...slide,
        objects: [ ...slide.objects, payload.object ]
    })
}

export type RemoveObjectFromSlidePayload = {
    slideID: string,
    objectID: string
}

export function removeObjectFromSlide(presentation: Presentation, payload: RemoveObjectFromSlidePayload): Presentation
{
    const slide = presentation.slides.find((slide: Slide) => slide.id === payload.slideID)
    if (!slide)
    {
        return presentation
    }

    return {
        ...updateSlide(presentation, {
            ...slide,
            objects: [ ...slide.objects ].filter((object: SlideObject) => object.id !== payload.objectID),
        }),
        selection: {
            ...presentation.selection,
            objects: [ ...presentation.selection.objects ].filter((selectedObjectID: string) => selectedObjectID !== payload.objectID)
        }
    }
}

export type ChangeObjectNamePayload = {
    newName: string
}

export function changeObjectName(presentation: Presentation, payload: ChangeObjectNamePayload): Presentation
{
    const [ slide, [ selectedObject ] ] = getSelected(presentation)
    if (!slide || !selectedObject)
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        name: payload.newName,
    }))
}

export type ChangeObjectPositionPayload = {
    newX?: number
    newY?: number
}

export function changeObjectPosition(presentation: Presentation, payload: ChangeObjectPositionPayload): Presentation
{
    const [ slide, [ selectedObject ] ] = getSelected(presentation)
    if (!slide || !selectedObject)
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        position: {
            x: typeof payload.newX === 'number' ? payload.newX : selectedObject.position.x,
            y: typeof payload.newY === 'number' ? payload.newY : selectedObject.position.y
        },
    }))
}

export type ChangeTextFontPayload = {
    newFont: Font
}

export function changeTextFont(presentation: Presentation, payload: ChangeTextFontPayload): Presentation
{
    const [ slide, [ selectedObject ] ] = getSelected(presentation)
    if (!slide || !selectedObject || selectedObject.type !== 'text')
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        font: payload.newFont,
    }))
}

export type ChangeTextContent = {
    newContent: string
}

export function changeTextContent(presentation: Presentation, payload: ChangeTextContent): Presentation
{
    const [ slide, [ selectedObject ] ] = getSelected(presentation)
    if (!slide || !selectedObject || selectedObject.type !== 'text')
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        content: payload.newContent
    }))
}

export type ChangeObjectHeightPayload = {
    newHeight: number
}

export function changeObjectHeight(presentation: Presentation, payload: ChangeObjectHeightPayload)
{
    const [ slide, [ selectedObject ] ] = getSelected(presentation)
    if (!slide || !selectedObject)
    {
        return presentation
    }

    if ('height' in selectedObject && typeof selectedObject.height === 'number')
    {
        return updateSlide(presentation, updateObject(slide, {
            ...selectedObject,
            height: payload.newHeight
        }))
    }

    return presentation
}

export type ChangeObjectWidthPayload = {
    width: number
}

export function changeObjectWidth(presentation: Presentation, payload: ChangeObjectWidthPayload)
{
    const [ slide, [ selectedObject ] ] = getSelected(presentation)
    if (!slide || !selectedObject)
    {
        return presentation
    }

    if ('width' in selectedObject && typeof selectedObject.width === 'number')
    {
        return updateSlide(presentation, updateObject(slide, {
            ...selectedObject,
            width: payload.width,
        }))
    }

    return presentation
}

function updateSlide(presentation: Presentation, newSlide: Slide): Presentation
{
    return {
        ...presentation,
        slides: [ ...presentation.slides ].map((slide: Slide) => slide.id === newSlide.id ? newSlide : slide)
    }
}

function updateObject(slide: Slide, newObject: SlideObject): Slide
{
    return {
        ...slide,
        objects: [ ...slide.objects ].map((object: SlideObject) => object.id === newObject.id ? newObject : object)
    }
}