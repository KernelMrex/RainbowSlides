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
} from '../../core/objects/objects'
import { changePresentationName } from '../../core/presentation/presentation'
import { deleteAllObjectsFromSelection, selectObject, selectSlide } from '../../core/selection/selection'
import { addSlide, changeOrderOfSlide, changesSlidesBackground, deleteSlide } from '../../core/slides/slides'
import * as type from '../../core/types'
import { Presentation } from '../../core/types'
import src from '../../src'
import { PresentationActionType } from './types'

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
        color: { hex: '#000000' },
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
        color: { hex: '#000000' },
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
        color: { hex: '#000000' },
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
        color: { hex: '#000000' },
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
        color: { hex: '#000000' },
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
        color: { hex: '#000000' },
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
        color: { hex: '#000000' },
    },
}

const slide1: type.Slide = {
    id: 'f321',
    objects: [ picture, simpleRectangle, simpleCircle, simpleTriangle, textFor1 ],
    background: {
        hex: '#d2508b',
    },
}

const slide2: type.Slide = {
    id: 'f421',
    objects: [ picture2, textFor2 ],
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

export const initialState: Presentation = {
    name: 'my first presentation',
    slides: [ slide1, slide2, slide3, slide4 ],
    //slides: [],
    selection: {
        slide: slide1.id,
        //slide: null,
        objects: [],
    },
}

export function presentationReducer(state: Presentation = initialState, action: PresentationActionType): Presentation
{
    switch (action.type)
    {
        case 'RENAME_PRESENTATION':
            return changePresentationName(state, { name: action.payload })
        case 'CHANGE_SLIDE':
            return changeOrderOfSlide(state, {
                place: action.payload.place,
                currentSlideId: action.payload.currentSlideId,
            })
        case 'SELECT_OBJECT':
            return selectObject(state, { objectId: action.payload.objectId })
        case 'UNSELECT_OBJECT':
            return deleteAllObjectsFromSelection(state)
        case 'SELECT_SLIDE':
            return selectSlide(state, { slide: action.payload.slide })
        case 'CHANGE_SIZE':
            return changeObjectSize(state, {
                newPosition: action.payload.newPosition,
                newHeight: action.payload.newHeight,
                newWidth: action.payload.newWidth,
            })
        case 'CHANGE_POSITION':
            return changeObjectPosition(state, { newPosition: action.payload.newPosition })
        case 'CHANGE_TEXT':
            return changeTextContent(state, { newContent: action.payload.newContent })
        case 'DOWNLOAD_PRESENTATION':
            return action.payload
        case 'ADD_SLIDE':
            return addSlide(state)
        case 'DELETE_SLIDE':
            return deleteSlide(state)
        case 'ADD_OBJECT':
            return addObjectToSlide(state, { object: action.payload })
        case 'DELETE_OBJECT':
            return deleteObject(state)
        case 'CHANGE_COLOR':
            return changeColor(state, { hex: action.payload })
        case 'CHANGE_COLOR_SLIDE':
            return changesSlidesBackground(state, { background: { hex: action.payload } })
        case 'REMOVE_COLOR':
            return removeColor(state)
        case 'UP_ITEM':
            return upItem(state)
        case 'DOWN_ITEM':
            return downItem(state)
        case 'ADD_IMAGE':
            return addImage(state, { source: action.payload })
        case 'ADD_BACKGROUND_IMAGE':
            return addBackgroundImage(state, { source: action.payload })
        case 'PASTE_ELEMENT':
            return pasteElement(state, {object: action.payload})
        default:
            return state
    }
}