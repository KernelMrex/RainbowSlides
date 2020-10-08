function addObjectToSlide(presentation: Presentation, slideID: string, object: SlideObject): Presentation
{
    const slide = presentation.slides.find((slide) => slide.id === slideID)
    if (slide === undefined)
    {
        return presentation;
    }

    const newSlide = {
        ...slide,
        objects: [...slide.objects, object]
    }

    return {
        ...presentation,
        slides: [...presentation.slides].map((slide: Slide) => slide.id === newSlide.id ? newSlide : slide)
    }
}

function removeObjectFromSlide(presentation: Presentation, slideID: string, objectID: string): Presentation
{
    const slide = presentation.slides.find((slide) => slide.id === slideID)
    if (slide === undefined)
    {
        return presentation;
    }

    const newSlide = {
        ...slide,
        objects: [...slide.objects].filter((object) => object.id !== objectID)
    }

    return {
        ...presentation,
        slides: [...presentation.slides].map((slide: Slide) => slide.id === newSlide.id ? newSlide : slide)
    }
}

export {
    addObjectToSlide,
    removeObjectFromSlide
}