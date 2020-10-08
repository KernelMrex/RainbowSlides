import * as utils from './slides-object-utils'

function addObjectToSlide(presentation: Presentation, slideID: string, object: SlideObject): Presentation
{
    const slide = presentation.slides.find((slide) => slide.id === slideID)
    if (slide === undefined)
    {
        return presentation;
    }

    return utils.updateSlide(presentation, {
        ...slide,
        objects: [...slide.objects, object]
    })
}

function removeObjectFromSlide(presentation: Presentation, slideID: string, objectID: string): Presentation
{
    const slide = presentation.slides.find((slide) => slide.id === slideID)
    if (slide === undefined)
    {
        return presentation;
    }

    return utils.updateSlide(presentation, {
        ...slide,
        objects: [...slide.objects].filter((object) => object.id !== objectID)
    })
}

function changeObjectName(presentation: Presentation, newName: string): Presentation
{
    const [slide, objects] = utils.getSelected(presentation)
    if (slide === null || objects === null || objects === [] || objects.length > 1)
    {
        return presentation
    }

    console.log('qwerty', objects)

    return utils.updateSlide(presentation, utils.updateObject(slide, {
        ...objects[0],
        name: newName,
    }))
}

function changeObjectPosition(presentation: Presentation, newPosition: Anchor): Presentation
{
    const [slide, objects] = utils.getSelected(presentation)
    if (slide === null || objects === null || objects.length > 1)
    {
        return presentation
    }

    return utils.updateSlide(presentation, utils.updateObject(slide, {
        ...objects[0],
        position: newPosition,
    }))
}

export {
    addObjectToSlide,
    removeObjectFromSlide,
    changeObjectName,
    changeObjectPosition
}