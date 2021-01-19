import {ChangeOrderOfSlidePayload} from "../../core/slides/slides";
import { SelectObjectPayload, SelectSlidePayload } from "../../core/selection/selection";
import {
    AddObjectToSlidePayload,
    ChangeObjectPositionPayload,
    ChangeObjectSizePayload,
    ChangeTextContentPayload
} from "../../core/objects/objects";
import {Presentation, Slide, SlideObject} from "../../core/types";

export const CHANGE_SLIDE = 'CHANGE_SLIDE'
export const RENAME_PRESENTATION = 'RENAME_PRESENTATION'
export const SELECT_OBJECT = 'SELECT_OBJECT'
export const SELECT_SLIDE = 'SELECT_SLIDE'
export const UNSELECT_OBJECT = 'UNSELECT_OBJECT'
export const CHANGE_SIZE = 'CHANGE_SIZE'
export const CHANGE_POSITION = 'CHANGE_POSITION'
export const CHANGE_TEXT = 'CHANGE_TEXT'
export const DOWNLOAD_PRESENTATION = 'DOWNLOAD_PRESENTATION'
export const ADD_SLIDE = 'ADD_SLIDE'
export const DELETE_SLIDE = 'DELETE_SLIDE'
export const ADD_OBJECT = 'ADD_OBJECT'
export const DELETE_OBJECT = 'DELETE_OBJECT'
export const CHANGE_COLOR = 'CHANGE_COLOR'
export const CHANGE_COLOR_SLIDE = 'CHANGE_COLOR_SLIDE'
export const REMOVE_COLOR = 'REMOVE_COLOR'
export const UP_ITEM = 'UP_ITEM'
export const DOWN_ITEM = 'DOWN_ITEM'
export const ADD_IMAGE = 'ADD_IMAGE'
export const ADD_BACKGROUND_IMAGE = 'ADD_BACKGROUND_IMAGE'
export const PASTE_ELEMENT = 'PASTE_ELEMENT'
export const UNDO = 'UNDO'
export const REDO = 'REDO'

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

interface DownloadPresentationAction {
    type: typeof DOWNLOAD_PRESENTATION
    payload: Presentation
}

interface AddSlideAction {
    type: typeof ADD_SLIDE
}

interface DeleteSlideAction {
    type: typeof DELETE_SLIDE
}

interface AddObjectAction {
    type: typeof ADD_OBJECT,
    payload: SlideObject
}

interface DeleteObjectAction {
    type: typeof DELETE_OBJECT,
}

interface ChangeColorAction {
    type: typeof CHANGE_COLOR,
    payload: string
}

interface ChangeColorSlideAction {
    type: typeof CHANGE_COLOR_SLIDE,
    payload: string
}

interface RemoveColorAction {
    type: typeof REMOVE_COLOR,
}

interface UpItemAction {
    type: typeof UP_ITEM,
}

interface DownItemAction {
    type: typeof DOWN_ITEM,
}

interface AddImageAction {
    type: typeof ADD_IMAGE,
    payload: string
}

interface AddBackgroundImageAction {
    type: typeof ADD_BACKGROUND_IMAGE,
    payload: string
}

interface PasteElementAction {
    type: typeof PASTE_ELEMENT,
    payload: SlideObject | undefined
}

interface UndoAction {
    type: typeof UNDO,
}

interface RedoAction {
    type: typeof REDO,
}

export type PresentationActionType =
    RenamePresentationAction |
    ChangeSlideAction |
    SelectObjectAction |
    UnselectObjectAction |
    SelectSlideAction |
    ChangeSizeAction |
    ChangePositionAction |
    ChangeTextAction |
    DownloadPresentationAction |
    AddSlideAction |
    DeleteSlideAction |
    AddObjectAction |
    DeleteObjectAction |
    ChangeColorAction |
    ChangeColorSlideAction |
    RemoveColorAction |
    UpItemAction |
    DownItemAction |
    AddImageAction |
    AddBackgroundImageAction |
    PasteElementAction |
    UndoAction |
    RedoAction