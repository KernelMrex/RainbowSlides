function addObjectToSlide(app: App, slide: Slide, object: SlideObject): App
{
    const slideIndex = app.presentation.slides.indexOf(slide);
    const newSlides = [...app.presentation.slides];

    newSlides[slideIndex] = {
        ...slide,
        objects: [...slide.objects, object]
    };

    return Object.freeze({
        ...app,
        presentation: {
            ...app.presentation,
            slides: newSlides,
        }
    });
}

function deleteObjectFromSlide(app: App, slide: Slide, object: SlideObject): App
{
    const slideIndex = app.presentation.slides.indexOf(slide);
    const newSlides = [...app.presentation.slides];

    newSlides[slideIndex] = {
        ...slide,
        objects: [...slide.objects].splice(slide.objects.indexOf(object), 1)
    };

    return Object.freeze({
        ...app,
        presentation: {
            ...app.presentation,
            slides: newSlides,
        }
    });
}