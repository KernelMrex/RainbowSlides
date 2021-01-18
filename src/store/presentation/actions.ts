import {
    ADD_OBJECT,
    ADD_SLIDE,
    CHANGE_COLOR,
    CHANGE_COLOR_SLIDE,
    CHANGE_POSITION,
    CHANGE_SIZE,
    CHANGE_SLIDE,
    CHANGE_TEXT,
    DELETE_OBJECT,
    DELETE_SLIDE,
    DOWNLOAD_PRESENTATION,
    PresentationActionType,
    REMOVE_COLOR,
    RENAME_PRESENTATION,
    SELECT_OBJECT,
    SELECT_SLIDE,
    UNSELECT_OBJECT,
    UP_ITEM,
    DOWN_ITEM
} from './types'
import {Anchor, Presentation, SlideObject} from "../../core/types";

export function renamePresentation(name: string): PresentationActionType
{
    return {
        type: RENAME_PRESENTATION,
        payload: name
    }
}

export function changeOrderOfSlide(place: number, currentSlideId: string): PresentationActionType
{
    return {
        type: CHANGE_SLIDE,
        payload: {
            place: place,
            currentSlideId: currentSlideId
        }
    }
}

export function changeSelectedObject(place: number, currentSlideId: string): PresentationActionType
{
    return {
        type: CHANGE_SLIDE,
        payload: {
            place: place,
            currentSlideId: currentSlideId
        }
    }
}

export function selectObject(objectId: string): PresentationActionType
{
    return {
        type: SELECT_OBJECT,
        payload: {
            objectId: objectId
        }
    }
}

export function unselectObject(): PresentationActionType
{
    return {
        type: UNSELECT_OBJECT
    }
}

export function selectSlide(slide: string): PresentationActionType
{
    return {
        type: SELECT_SLIDE,
        payload: {
            slide: slide
        }
    }
}

export function changeSize(newPosition: Anchor, newHeight: number, newWidth: number): PresentationActionType
{
    return {
        type: CHANGE_SIZE,
        payload: {
            newPosition: newPosition,
            newHeight: newHeight,
            newWidth: newWidth
        }
    }
}

export function changePosition(newPosition: Anchor): PresentationActionType
{
    return {
        type: CHANGE_POSITION,
        payload: {
            newPosition: newPosition
        }
    }
}

export function changeText(newContent: string): PresentationActionType
{
    return {
        type: CHANGE_TEXT,
        payload: {
            newContent: newContent
        }
    }
}

export function downloadPresentation(newPresentation: Presentation): PresentationActionType
{
    return {
        type: DOWNLOAD_PRESENTATION,
        payload: newPresentation
    }
}

export function addSlide(): PresentationActionType
{
    return {
        type: ADD_SLIDE
    }
}

export function deleteSlide(): PresentationActionType
{
    return {
        type: DELETE_SLIDE
    }
}

export function addObject(object: SlideObject): PresentationActionType
{
    return {
        type: ADD_OBJECT,
        payload: object
    }
}

export function deleteObject(): PresentationActionType
{
    return {
        type: DELETE_OBJECT
    }
}

export function changeColor(hex: string): PresentationActionType
{
    return {
        type: CHANGE_COLOR,
        payload: hex
    }
}

export function changeColorSlide(hex: string): PresentationActionType
{
    return {
        type: CHANGE_COLOR_SLIDE,
        payload: hex
    }
}

export function removeColor(): PresentationActionType
{
    return {
        type: REMOVE_COLOR,
    }
}

export function upItem(): PresentationActionType
{
    return {
        type: UP_ITEM,
    }
}

export function downItem(): PresentationActionType
{
    return {
        type: DOWN_ITEM,
    }
}