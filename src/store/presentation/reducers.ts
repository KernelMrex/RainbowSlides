import { changePresentationName } from '../../core/presentation/presentation'
import { Presentation } from '../../core/types'
import { PresentationActionType } from './types'
import {addSlide, changeOrderOfSlide, deleteSlide} from "../../core/slides/slides";
import * as type from "../../core/types";
import src from "../../src";
import {selectObject, deleteAllObjectsFromSelection, selectSlide} from "../../core/selection/selection";
import {addObjectToSlide, changeObjectPosition, changeObjectSize, changeTextContent} from "../../core/objects/objects";
import {act} from "react-dom/test-utils";

const textFor1: type.TextBlock = {
    id: 'f134',
    type: 'text',
    name: 'test1',
    position: {
        x: 870,
        y: 2
    },
    height: 700,
    width: 400,
    color: {
        hex: '#ecf2d7'
    },
    content: 'Смотрите, кто тут у нас спрятался. ' +
        'А, это же пример текста. Круто!',
    font: {
        family: 'Comic Sans MS',
        size: 30,
        weight: 500,
        style: 'none'
    },
    background: {
        hex: '#00004f'
    },
    stroke: {
        style: "dashed",
        width: 0,
        color: {hex: '#000000'}
    }
}

const textFor2: type.TextBlock = {
    id: 'f135',
    type: 'text',
    name: 'test1',
    position: {
        x: 70,
        y: 2
    },
    height: 700,
    width: 1200,
    color: {
        hex: '#000000'
    },
    content: 'ААА, выпустите их этого маленького прямоугольника. Контрл зет, контрл зеет!!!! Почему не работает?!!',
    font: {
        family: 'Comic Sans MS',
        size: 60,
        weight: 500,
        style: 'none'
    },
    background: {
        hex: 'none'
    },
    stroke: {
        style: "dashed",
        width: 0,
        color: {hex: '#000000'}
    }
}

const picture: type.ImageBlock = {
    id: 'f123',
    type: 'image',
    name: 'Toronto',
    position: {
        x: 500,
        y: 23
    },
    height: 500,
    width: 360,
    source: src,
    background: {
        hex: '#ffffff'
    },
    stroke: {
        style: "dashed",
        width: 0,
        color: {hex: '#000000'}
    }
}

const picture2: type.ImageBlock = {
    id: 'f128',
    type: 'image',
    name: 'Toronto2',
    position: {
        x: 600,
        y: 300
    },
    height: 256,
    width: 256,
    source: 'https://at-cdn-s02.audiotool.com/2018/12/12/documents/n1f68tt0/0/cover256x256-3b54774168b54f3ead1d00ea2cc0908a.jpg',
    background: {
        hex: '#ffffff'
    },
    stroke: {
        style: "dashed",
        width: 0,
        color: {hex: '#000000'}
    }
}

const simpleRectangle: type.RectangleBlock = {
    id: 'f124',
    type: 'rectangle',
    name: 'rectangle',
    position: {
        x: 200,
        y: 200
    },
    height: 213,
    width: 321,
    background: {
        hex: '#fa71d3'
    },
    stroke: {
        style: "dashed",
        width: 0,
        color: {hex: '#000000'}
    }
}

const simpleCircle: type.CircleBlock = {
    id: 'f125',
    type: 'circle',
    name: 'circle',
    position: {
        x: 150,
        y: 100
    },
    height: 300,
    width: 200,
    background: {
        hex: '#f2331b'
    },
    stroke: {
        style: "dashed",
        width: 0,
        color: {hex: '#000000'}
    }
}

const simpleTriangle: type.TriangleBlock = {
    id: 'f126',
    type: 'triangle',
    name: 'circle',
    position: {
        x: 650,
        y: 450
    },
    height: 200,
    width: 200,
    background: {
        hex: '#046d06'
    },
    stroke: {
        style: "dashed",
        width: 0,
        color: {hex: '#000000'}
    }
}

const slide1: type.Slide = {
    id: 'f321',
    objects: [ picture, simpleRectangle, simpleCircle, simpleTriangle, textFor1 ],
    background: {
        hex: '#d2508b'
    }
}

const slide2: type.Slide = {
    id: 'f421',
    objects: [ picture2, textFor2 ],
    background: {
        hex: '#a2ee9a'
    }
}

const slide3: type.Slide = {
    id: 'f521',
    objects: [],
    background: {
        source: 'https://fony-kartinki.ru/_ph/137/2/668474667.png'
    }
}

const slide4: type.Slide = {
    id: 'f621',
    objects: [],
    background: {
        source: 'https://img5.goodfon.ru/wallpaper/nbig/9/21/girl-anime-wallpapers-anime-girl.jpg'
    }
}

export const initialState: Presentation = {
    name: 'my first presentation',
    slides: [slide1, slide2, slide3, slide4],
    //slides: [],
    selection: {
        slide: slide1.id,
        //slide: null,
        objects: []
    }
}

export function presentationReducer(state: Presentation = initialState, action: PresentationActionType): Presentation
{
    switch (action.type)
    {
        case 'RENAME_PRESENTATION':
            return changePresentationName(state, { name: action.payload })
            break
        case 'CHANGE_SLIDE':
            return changeOrderOfSlide(state, { place: action.payload.place, currentSlideId: action.payload.currentSlideId })
            break
        case 'SELECT_OBJECT':
            return selectObject(state, { objectId: action.payload.objectId })
            break
        case 'UNSELECT_OBJECT':
            return deleteAllObjectsFromSelection(state)
            break
        case 'SELECT_SLIDE':
            return selectSlide(state, {slide: action.payload.slide})
            break
        case 'CHANGE_SIZE':
            return changeObjectSize(state, {newPosition: action.payload.newPosition, newHeight: action.payload.newHeight, newWidth: action.payload.newWidth})
            break
        case 'CHANGE_POSITION':
            return changeObjectPosition(state, {newPosition: action.payload.newPosition})
            break
        case 'CHANGE_TEXT':
            return changeTextContent(state, {newContent: action.payload.newContent})
            break
        case 'DOWNLOAD_PRESENTATION':
            return action.payload
            break
        case 'ADD_SLIDE':
            return addSlide(state)
            break
        case 'DELETE_SLIDE':
            return deleteSlide(state)
            break
        case 'ADD_OBJECT':
            return addObjectToSlide(state, {object: action.payload})
            break
        default:
            return state
    }
}