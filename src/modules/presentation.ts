function createApp(name: string): App
{
    return{
        presentation: {
            name: name,
            slides: [],
            selection: {
                slide: null,
                object: null
            }
        },
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
        presentation: { //function
            name: '',
            slides: [],
            selection: {
                slide: null,
                object: null
            }
        }
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

