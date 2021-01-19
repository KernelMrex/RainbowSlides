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

const textFor1: type.TextBlock = {
    id: 'f134',
    type: 'text',
    name: 'test1',
    position: {
        x: 870,
        y: 2,
    },
    height: 700,
    width: 400,
    color: {
        hex: '#ecf2d7',
    },
    content: 'Смотрите, кто тут у нас спрятался. ' +
        'А, это же пример текста. Круто!',
    font: {
        family: 'Comic Sans MS',
        size: 30,
        weight: 500,
        style: 'none',
    },
    background: {
        hex: '#00004f',
    },
    stroke: {
        style: 'dashed',
        width: 0,
        color: {hex: '#000000'},
    },
}

const textFor2: type.TextBlock = {
    id: 'f135',
    type: 'text',
    name: 'test1',
    position: {
        x: 70,
        y: 2,
    },
    height: 700,
    width: 1200,
    color: {
        hex: '#000000',
    },
    content: 'ААА, выпустите их этого маленького прямоугольника. Контрл зет, контрл зеет!!!! Почему не работает?!!',
    font: {
        family: 'Comic Sans MS',
        size: 60,
        weight: 500,
        style: 'none',
    },
    background: {
        hex: 'none',
    },
    stroke: {
        style: 'dashed',
        width: 0,
        color: {hex: '#000000'},
    },
}

const picture: type.ImageBlock = {
    id: 'f123',
    type: 'image',
    name: 'Toronto',
    position: {
        x: 500,
        y: 23,
    },
    height: 500,
    width: 360,
    source: src,
    background: {
        hex: '#ffffff',
    },
    stroke: {
        style: 'dashed',
        width: 0,
        color: {hex: '#000000'},
    },
}

const picture2: type.ImageBlock = {
    id: 'f128',
    type: 'image',
    name: 'Toronto2',
    position: {
        x: 600,
        y: 300,
    },
    height: 256,
    width: 256,
    source: 'https://at-cdn-s02.audiotool.com/2018/12/12/documents/n1f68tt0/0/cover256x256-3b54774168b54f3ead1d00ea2cc0908a.jpg',
    background: {
        hex: '#ffffff',
    },
    stroke: {
        style: 'dashed',
        width: 0,
        color: {hex: '#000000'},
    },
}

const simpleRectangle: type.RectangleBlock = {
    id: 'f124',
    type: 'rectangle',
    name: 'rectangle',
    position: {
        x: 200,
        y: 200,
    },
    height: 213,
    width: 321,
    background: {
        hex: '#fa71d3',
    },
    stroke: {
        style: 'dashed',
        width: 0,
        color: {hex: '#000000'},
    },
}

const simpleCircle: type.CircleBlock = {
    id: 'f125',
    type: 'circle',
    name: 'circle',
    position: {
        x: 150,
        y: 100,
    },
    height: 300,
    width: 200,
    background: {
        hex: '#f2331b',
    },
    stroke: {
        style: 'dashed',
        width: 0,
        color: {hex: '#000000'},
    },
}

const simpleTriangle: type.TriangleBlock = {
    id: 'f126',
    type: 'triangle',
    name: 'circle',
    position: {
        x: 650,
        y: 450,
    },
    height: 200,
    width: 200,
    background: {
        hex: '#046d06',
    },
    stroke: {
        style: 'dashed',
        width: 0,
        color: {hex: '#000000'},
    },
}

const slide1: type.Slide = {
    id: 'f321',
    objects: [picture, simpleRectangle, simpleCircle, simpleTriangle, textFor1],
    background: {
        hex: '#d2508b',
    },
}

const slide2: type.Slide = {
    id: 'f421',
    objects: [picture2, textFor2],
    background: {
        hex: '#a2ee9a',
    },
}

const slide3: type.Slide = {
    id: 'f521',
    objects: [],
    background: {
        source: 'https://fony-kartinki.ru/_ph/137/2/668474667.png',
    },
}

const slide4: type.Slide = {
    id: 'f621',
    objects: [],
    background: {
        source: 'https://img5.goodfon.ru/wallpaper/nbig/9/21/girl-anime-wallpapers-anime-girl.jpg',
    },
}

const initialPresentation: Presentation = {
    name: 'my first presentation',
    slides: [],
    selection: {
        slide: null,
        objects: [],
    },
}

export const initialState: AppState<Presentation> = {
    presentation: {
        name: 'my first presentation',
        slides: [slide1, slide2, slide3, slide4],
        //slides: [],
        selection: {
            slide: slide1.id,
            //slide: null,
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