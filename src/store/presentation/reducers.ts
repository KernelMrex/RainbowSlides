import {
    addBackgroundImage,
    addImage,
    addObjectToSlide,
    changeColor,
    changeObjectPosition,
    changeObjectSize,
    changeTextContent,
    deleteObject,
    downItem,
    removeColor,
    upItem,
    pasteElement,
    changeTextSize,
    changeTextColor,
    changeTextFamily,
} from '../../core/objects/objects'
import {changePresentationName} from '../../core/presentation/presentation'
import {deleteAllObjectsFromSelection, selectObject, selectSlide} from '../../core/selection/selection'
import {addSlide, changeOrderOfSlide, changesSlidesBackground, deleteSlide} from '../../core/slides/slides'
import * as type from '../../core/types'
import {AppState, Presentation} from '../../core/types'
import src from '../../src'
import {PresentationActionType} from './types'

export const initialState: AppState<Presentation> = {
    presentation: {
        name: 'my first presentation',
        slides: [],
        selection: {
            slide: null,
            objects: [],
        }
    },
    history: {
        undo: [],
        redo: []
    }
}

export function presentationReducer(state: AppState<Presentation> = initialState, action: PresentationActionType): AppState<Presentation>
{
    switch (action.type)
    {
        case 'RENAME_PRESENTATION':
            return {
                presentation: changePresentationName(state.presentation, {name: action.payload}),
                history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'CHANGE_SLIDE':
            return {
                presentation: changeOrderOfSlide(state.presentation, {
                    place: action.payload.place,
                    currentSlideId: action.payload.currentSlideId,
                }), history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'SELECT_OBJECT':
            return {
                presentation: selectObject(state.presentation, {objectId: action.payload.objectId}),
                history: state.history
            }
        case 'UNSELECT_OBJECT':
            return {presentation: deleteAllObjectsFromSelection(state.presentation), history: state.history}
        case 'SELECT_SLIDE':
            return {
                presentation: selectSlide(state.presentation, {slide: action.payload.slide}),
                history: state.history
            }
        case 'CHANGE_SIZE':
            return {
                presentation: changeObjectSize(state.presentation, {
                    newPosition: action.payload.newPosition,
                    newHeight: action.payload.newHeight,
                    newWidth: action.payload.newWidth,
                }), history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'CHANGE_POSITION':
            return {
                presentation: changeObjectPosition(state.presentation, {newPosition: action.payload.newPosition}),
                history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'CHANGE_TEXT':
            return {
                presentation: changeTextContent(state.presentation, {newContent: action.payload.newContent}), history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'DOWNLOAD_PRESENTATION':
            return {presentation: action.payload, history: state.history}
        case 'ADD_SLIDE':
            return {
                presentation: addSlide(state.presentation), history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'DELETE_SLIDE':
            return {
                presentation: deleteSlide(state.presentation),
                history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'ADD_OBJECT':
            return {
                presentation: addObjectToSlide(state.presentation, {object: action.payload}),
                history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'DELETE_OBJECT':
            return {
                presentation: deleteObject(state.presentation),
                history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'CHANGE_COLOR':
            return {
                presentation: changeColor(state.presentation, {hex: action.payload}),
                history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'CHANGE_COLOR_SLIDE':
            return {
                presentation: changesSlidesBackground(state.presentation, {background: {hex: action.payload}}),
                history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'REMOVE_COLOR':
            return {
                presentation: removeColor(state.presentation), history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'UP_ITEM':
            return {
                presentation: upItem(state.presentation), history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'DOWN_ITEM':
            return {
                presentation: downItem(state.presentation), history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'ADD_IMAGE':
            return {
                presentation: addImage(state.presentation, {source: action.payload}), history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'ADD_BACKGROUND_IMAGE':
            return {
                presentation: addBackgroundImage(state.presentation, {source: action.payload}),
                history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'PASTE_ELEMENT':
            return {
                presentation: pasteElement(state.presentation, {object: action.payload}), history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'UNDO':
            if (!state.history.undo[0])
            {
                return state
            }

            const previous: Presentation = state.history.undo[state.history.undo.length - 1]
            const newPast: Array<Presentation> = state.history.undo.slice(0, state.history.undo.length - 1)
            return {
                presentation: previous,
                history: {
                    undo: newPast,
                    redo: [state.presentation, ...state.history.redo]
                }
            }
        case 'REDO':
            if (!state.history.redo[0])
            {
                return state
            }
                const next: Presentation = state.history.redo[0]
                const newFuture: Array<Presentation> = state.history.redo.slice(1)
                return {
                    presentation: next,
                    history: {
                        undo: [...state.history.undo, state.presentation],
                        redo: newFuture
                    }
                }
        case 'CHANGE_TEXT_SIZE':
            return {
                presentation: changeTextSize(state.presentation, {size: action.payload}), history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'CHANGE_TEXT_COLOR':
            return {
                presentation: changeTextColor(state.presentation, {hex: action.payload}), history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        case 'CHANGE_TEXT_FAMILY':
            return {
                presentation: changeTextFamily(state.presentation, {family: action.payload}), history: {
                    ...state.history,
                    undo: [...state.history.undo, state.presentation],
                }
            }
        default:
            return state
    }
}