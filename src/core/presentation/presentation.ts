import { Presentation } from '../types'

function createPresentation(name: string = 'simple name'): Presentation
{
    return {
        name: name,
        slides: [],
        selection: {
            slide: null,
            objects: []
        }
    }
}

function changePresentationName(presentation: Presentation, name: string): Presentation
{
    return {
        ...presentation,
        name: name
    }
}

function getJSONOfPresentation(presentation: Presentation): string
{
    return JSON.stringify(presentation)
}

function getPresentationFromJSON(presentationInJSON: string): Presentation
{
    return JSON.parse(presentationInJSON)
}

export {
    changePresentationName,
    createPresentation,
    getJSONOfPresentation,
    getPresentationFromJSON
}