import {ChangeOrderOfSlidePayload} from "../../core/slides/slides";
import { SelectObjectPayload, SelectSlidePayload } from "../../core/selection/selection";
import {
    ChangeObjectPositionPayload,
    ChangeObjectSizePayload,
    ChangeTextContentPayload
} from "../../core/objects/objects";

export const CHANGE_SLIDE = 'CHANGE_SLIDE'
export const RENAME_PRESENTATION = 'RENAME_PRESENTATION'
export const SELECT_OBJECT = 'SELECT_OBJECT'
export const SELECT_SLIDE = 'SELECT_SLIDE'
export const UNSELECT_OBJECT = 'UNSELECT_OBJECT'
export const CHANGE_SIZE = 'CHANGE_SIZE'
export const CHANGE_POSITION = 'CHANGE_POSITION'
export const CHANGE_TEXT = 'CHANGE_TEXT'

interface RenamePresentationAction {
    type: typeof RENAME_PRESENTATION
    payload: string
}

interface ChangeSlideAction {
    type: typeof CHANGE_SLIDE
    payload: ChangeOrderOfSlidePayload
}

interface SelectObjectAction {
    type: typeof SELECT_OBJECT
    payload: SelectObjectPayload
}

interface UnselectObjectAction {
    type: typeof UNSELECT_OBJECT
}

interface SelectSlideAction {
    type: typeof SELECT_SLIDE
    payload: SelectSlidePayload
}

interface ChangeSizeAction {
    type: typeof CHANGE_SIZE
    payload: ChangeObjectSizePayload
}

interface ChangePositionAction {
    type: typeof CHANGE_POSITION
    payload: ChangeObjectPositionPayload
}

interface ChangeTextAction {
    type: typeof CHANGE_TEXT
    payload: ChangeTextContentPayload
}

export type PresentationActionType =
    RenamePresentationAction |
    ChangeSlideAction |
    SelectObjectAction |
    UnselectObjectAction |
    SelectSlideAction |
    ChangeSizeAction |
    ChangePositionAction |
    ChangeTextAction