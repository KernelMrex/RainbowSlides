import { Presentation } from '../types'

export type CreatePresentationPayload = {
    name?: string
}

export function createPresentation(payload: CreatePresentationPayload): Presentation
{
    if (payload.name === undefined)
    {
        payload.name = 'simple name'
    }
    return {
        name: payload.name,
        slides: [],
        selection: {
            slide: null,
            objects: []
        }
    }
}

export type ChangePresentationNamePayload = {
    name: string
}

export function changePresentationName(presentation: Presentation, payload: ChangePresentationNamePayload): Presentation
{
    return {
        ...presentation,
        name: payload.name
    }
}

export function getJSONOfPresentation(presentation: Presentation): string
{
    return JSON.stringify(presentation)
}

export function getPresentationFromJSON(presentationInJSON: string): Presentation
{
    return JSON.parse(presentationInJSON)
}