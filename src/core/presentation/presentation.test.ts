import {
    changePresentationName,
    createPresentation,
    getJSONOfPresentation,
    getPresentationFromJSON
} from './presentation'

import { Presentation, Slide } from '../types'

const slide1: Slide = {
    id: 'f123',
    objects: [],
    background: {
        source: 'url'
    }
}

const newPresentation: Presentation = {
    name: 'name',
    slides: [ slide1 ],
    selection: {
        slide: null,
        objects: []
    }
}

describe('test module "Presentation"', () => {
    test('get new presentation', () => {
        const newPresentation: Presentation = createPresentation({name: 'How to grow up'})
        expect(newPresentation).toEqual({
            name: 'How to grow up',
            slides: [],
            selection: {
                slide: null,
                objects: []
            }
        })
    })

    test('get new presentation without name', () => {
        const newPresentation: Presentation = createPresentation({})
        expect(newPresentation).toEqual({
            name: 'simple name',
            slides: [],
            selection: {
                slide: null,
                objects: []
            }
        })
    })

    test('get json of presentation', () => {
        const expectedJSON = JSON.stringify(newPresentation)
        expect(getJSONOfPresentation(newPresentation)).toEqual(expectedJSON)
    })

    test('get presentation from object', () => {
        const PresentationJSON: string = JSON.stringify(newPresentation)
        expect(getPresentationFromJSON(PresentationJSON)).toEqual(newPresentation)
    })

    test('change name of presentation on right name', () => {
        const newNamedPresentation: Presentation = changePresentationName(newPresentation, {name: 'test'})
        expect(newNamedPresentation).toEqual({
            ...newPresentation,
            name: 'test'
        })
    })
})
