import {
    Anchor,
    Font,
    Presentation,
    Slide,
    SlideObject,
    CommonBlock,
    TriangleBlock,
    Color,
    RectangleBlock, CircleBlock, TextBlock
} from '../types'
import {getSelected, getSelectedObjects, getSelectedSlide} from '../selection/selection'
import {getBufferElement, setBufferElement} from '../../buffer/buffer';
import {getNewId} from "../slides/slides";

export type AddObjectToSlidePayload = {
    object: SlideObject
}

export function addObjectToSlide(presentation: Presentation, payload: AddObjectToSlidePayload): Presentation
{
    const slide = presentation.slides.find((slide: Slide) => slide.id === presentation.selection.slide)
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
    const [slide, [selectedObject]] = getSelected(presentation)
    if (!slide || !selectedObject || selectedObject.type !== 'text')
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        font: payload.newFont,
    }))
}

export type ChangeTextContentPayload = {
    newContent: string
}

export function changeTextContent(presentation: Presentation, payload: ChangeTextContentPayload): Presentation
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

export function removeColor(presentation: Presentation): Presentation
{
    const [slide, [selectedObject]] = getSelected(presentation)
    if (!slide || !selectedObject)
    {
        return presentation
    }

    return updateSlide(presentation, updateObject(slide, {
        ...selectedObject,
        background: {
            hex: 'none'
        }
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

export function deleteObject(presentation: Presentation): Presentation
{
    const selectedObject: SlideObject = getSelectedObjects(presentation)[0]
    const selectedSlide: Slide | null = getSelectedSlide(presentation)

    if (!selectedObject || !selectedSlide)
    {
        return presentation
    }

    const newSlide = {...selectedSlide}
    newSlide.objects.splice(newSlide.objects.indexOf(selectedObject), 1)
    return updateSlide(presentation, newSlide)
}

export type ChangeColorPayload = {
    hex: string
}

export function changeColor(presentation: Presentation, payload: ChangeColorPayload): Presentation
{
    const selectedObject: SlideObject = getSelectedObjects(presentation)[0]
    const selectedSlide: Slide | null = getSelectedSlide(presentation)

    if (!selectedObject || !selectedSlide)
    {
        return presentation
    }

    const newSlide = {...selectedSlide}
    return updateSlide(presentation, updateObject(newSlide, {
        ...selectedObject,
        background: {
            hex: payload.hex
        }
    }))
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

export type CopyElementPayload = {
    copiedElement: SlideObject | undefined
}

export function copyElement(presentation: Presentation, payload: CopyElementPayload): void
{
    const selectedObjects: Array<SlideObject> = getSelectedObjects(presentation);
    setBufferElement((selectedObjects[0] === payload.copiedElement) ? payload.copiedElement : undefined)
}

export function pasteElement(presentation: Presentation): Presentation
{
    const selectedSlide: Slide | null = getSelectedSlide(presentation)
    let pastedElement: SlideObject | undefined = getBufferElement()
    if (pastedElement === undefined || selectedSlide === null)
    {
        return presentation
    }

    return addObjectToSlide(presentation, {
        object: {
            ...pastedElement,
            id: getNewId(),
            position: getPastedElementPosition(pastedElement, selectedSlide)
        }
    })
}

function getPastedElementPosition(pastedElement: SlideObject, selectedSlide: Slide): Anchor
{
    let newPosition: Anchor = {x: pastedElement.position.x - 25, y: pastedElement.position.y - 25};
    selectedSlide.objects.map((object) => {
        if (isClone(object, pastedElement) && (object.position.x === newPosition.x && object.position.y === newPosition.y)) {
            newPosition = {x: newPosition.x - 25, y: newPosition.y - 25}
        }
    })

    return newPosition
}

function isClone(parent: SlideObject, clone: SlideObject): boolean
{
    return parent.width === clone.width &&
        parent.height === clone.height &&
        parent.type === clone.type &&
        parent.background === clone.background
}

export function getDefaultTriangle(): TriangleBlock
{
    const id: string = getNewId()
    return {
        id: id,
        name: 'triangle-' + id,
        position: {x: 200, y: 200},
        height: 200,
        width: 200,
        background: {hex: '#000000'},
        type: 'triangle',
        stroke: {style: 'solid', color: {hex: '#123123'}, width: 0}
    }
}

export function getDefaultRectangle(): RectangleBlock
{
    const id: string = getNewId()
    return {
        id: id,
        name: 'rectangle-' + id,
        position: {x: 200, y: 200},
        height: 200,
        width: 200,
        background: {hex: '#000000'},
        type: 'rectangle',
        stroke: {style: 'solid', color: {hex: '#123123'}, width: 0}
    }
}

export function getDefaultCircle(): CircleBlock
{
    const id: string = getNewId()
    return {
        id: id,
        name: 'circle-' + id,
        position: {x: 200, y: 200},
        height: 200,
        width: 200,
        background: {hex: '#123321'},
        type: 'circle',
        stroke: {style: 'solid', color: {hex: '#123123'}, width: 0}
    }
}

export function getDefaultText(): TextBlock
{
    const id: string = getNewId()
    return {
        id: id,
        name: 'circle-' + id,
        position: {x: 200, y: 200},
        height: 200,
        width: 200,
        background: {hex: 'none'},
        type: 'text',
        stroke: {style: 'solid', color: {hex: '#123123'}, width: 0},
        font: {
            family: 'Comic Sans MS',
            size: 13,
            weight: 500,
            style: 'none'
        },
        content: 'Пример текста',
        color: {hex: '000000'}
    }
}