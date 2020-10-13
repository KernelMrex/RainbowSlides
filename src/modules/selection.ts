function selectSlide(presentation: Presentation, slide: Slide): Presentation
{
    return {
        ...presentation,
        selection: {
            slide: slide.id,
            object: []
        }
    }
}

function deleteSlideFromSelection(presentation: Presentation): Presentation
{
    return {
        ...presentation,
        selection: {
            slide: null,
            object: []
        }
    }
}

function selectObject(presentation: Presentation, objectId: string): Presentation
{
    let objects: Array<string>;
    let currentSlide: Slide = presentation.slides.filter(slide => slide.id == presentation.selection.slide)[0];

    if (presentation.selection.object !== []) {
        objects = [...presentation.selection.object];
    } else {
        objects = [];
    }

    if (objectId == currentSlide.objects.filter(object => object.id == objectId)[0].id) {
        objects.push(objectId);
    }
    return {
        ...presentation,
        selection: {
            ...presentation.selection,
            object: objects
        }
    }
}

function deleteObjectFromSelection(presentation: Presentation, object: string): Presentation
{
    if (presentation.selection.object !== []) {
        let objects: Array<string> = presentation.selection.object.splice(presentation.selection.object.indexOf(object), 1);
        return {
            ...presentation,
            selection: {
                ...presentation.selection,
                object: objects
            }
        }
    }

    return presentation
}

export {selectSlide, selectObject, deleteObjectFromSelection, deleteSlideFromSelection};