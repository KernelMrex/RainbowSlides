import {Anchor, Font, Presentation, Slide, SlideObject, CommonBlock} from '../types'
import {getSelected} from '../selection/selection'

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
        objects: [...slide.objects, payload.object]
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
            objects: [...slide.objects].filter((object: SlideObject) => object.id !== payload.objectID),
        }),
        selection: {
            ...presentation.selection,
            objects: [...presentation.selection.objects].filter((selectedObjectID: string) => selectedObjectID !== payload.objectID)
        }
    }
}

export type ChangeObjectNamePayload = {
    newName: string
}

export function changeObjectName(presentation: Presentation, payload: ChangeObjectNamePayload): Presentation
{
    const [slide, [selectedObject]] = getSelected(presentation)
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
    newPosition: Anchor
}

export function changeObjectPosition(presentation: Presentation, payload: ChangeObjectPositionPayload): Presentation
{
    const [slide, [selectedObject]] = getSelected(presentation)
    if (!slide || !selectedObject)
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        position: payload.newPosition,
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
    const [slide, [selectedObject]] = getSelected(presentation)
    if (!slide || !selectedObject || selectedObject.type !== 'text')
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        content: payload.newContent
    }))
}

export type ChangeMediaSourcePayload = {
    newSource: string
}

export function changeMediaSource(presentation: Presentation, payload: ChangeMediaSourcePayload): Presentation
{
    const [slide, [selectedObject]] = getSelected(presentation)
    if (!slide || !selectedObject || !['media', 'image'].includes(selectedObject.type))
    {
        return presentation
    }


    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        source: payload.newSource,
    } as SlideObject))
}

export type ChangeObjectSizePayload = {
    newPosition: Anchor
    newWidth: number | null
    newHeight: number | null
}

export function changeObjectSize(presentation: Presentation, payload: ChangeObjectSizePayload): Presentation
{
    const [slide, [selectedObject]] = getSelected(presentation)
    if (!slide || !selectedObject)
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        position: !payload.newPosition ? selectedObject.position : payload.newPosition,
        width: !payload.newWidth ? selectedObject.width : payload.newWidth,
        height: !payload.newHeight ? selectedObject.height : payload.newHeight,
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