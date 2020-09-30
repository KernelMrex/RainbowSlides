function addSlide(slidesList: Array<Slide | undefined>)
{
    let Slide: Slide = getDefaultSlide();
    slidesList.push(Slide);
}

function getDefaultSlide() : Slide 
{
    let slidesObjects: Array<SlidesObject> = [];
    return {
        id: getNewId(),
        objects: slidesObjects,
        background: '#ffffff'
    }
}

function getNewId() : string 
{
    return `f${(~~(Math.random()*1e8)).toString(16)}`;
}