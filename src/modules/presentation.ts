function createApp(name: string): App
{
    return{
        presentation: createPresentation(name),
        history: {
            undoStack: [],
            redoStack: []
        }
    }
}

function deletePresentation(app: App): App
{
    return {
        ...app,
        presentation: createPresentation(),
    }
}

function createPresentation(name = "simple name"): Presentation
{
    return {
        name: name,
        slides: [],
        selection: {
            slide: null,
            object: null
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

