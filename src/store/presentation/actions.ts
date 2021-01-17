import {
    CHANGE_SLIDE,
    PresentationActionType,
    RENAME_PRESENTATION,
    SELECT_OBJECT,
    UNSELECT_OBJECT,
    SELECT_SLIDE,
    CHANGE_SIZE,
    CHANGE_POSITION,
    CHANGE_TEXT
} from './types'
import {Anchor} from "../../core/types";

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