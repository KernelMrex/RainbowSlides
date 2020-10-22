function deletePresentation(): Presentation
{
    return createPresentation()
}

function createPresentation(name = "simple name"): Presentation
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

function changePresentationsName(presentation: Presentation, name: string): Presentation
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
    return JSON.parse(presentationInJSON);
}

export {deletePresentation, changePresentationsName, createPresentation, getJSONOfPresentation, getPresentationFromJSON};