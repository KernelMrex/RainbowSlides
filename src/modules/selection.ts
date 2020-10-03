function selectSlide(presentation: Presentation, slide: Slide): Presentation
{
    return {
        ...presentation,
        selection: {
            slide: slide.id,
            object: null
        }
    }
}

function deleteSlideFromSelection(presentation: Presentation): Presentation
{
    return {
        ...presentation,
        selection: {
            slide: null,
            object: null
        }
    }
}

function selectObject(presentation: Presentation, object: SlidesObject): Presentation
{
    let objects: Array<SlidesObject>;
    if (presentation.selection.object !== null) {
        objects = [...presentation.selection.object];
    } else {
        objects = [];
    }

    objects.push(object);
    return {
        ...presentation,
        selection: {
            ...presentation.selection,
            object: objects
        }
    }
}

function deleteObjectFromSelection(presentation: Presentation, object: SlidesObject): Presentation
{
    if (presentation.selection.object !== null) {
        let objects: Array<SlidesObject> = presentation.selection.object?.splice(presentation.selection.object?.indexOf(object), 1);
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