import { getDefaultCircle, getDefaultRectangle, getDefaultText, getDefaultTriangle } from '../core/objects/objects'
import { getPresentationFromJSON } from '../core/presentation/presentation'
import { Presentation, SlideObject } from '../core/types'

export function getPayloadForChangeSlidePosition(presentation: Presentation, estimatedSlideId: string, currentSlideId: string, position: string)
{
    const slidesId: Array<string> = presentation.slides.map((slide) =>
    {
        return slide.id
    })

    const indexOfEstimatedSlideId: number = slidesId.indexOf(estimatedSlideId)
    const indexOfCurrentSlideId: number = slidesId.indexOf(currentSlideId)

    let additionalCoef: number = 0

    if (indexOfEstimatedSlideId > indexOfCurrentSlideId)
    {
        additionalCoef = position === 'bottom' ? 0 : -1
    }

    if (indexOfEstimatedSlideId < indexOfCurrentSlideId)
    {
        additionalCoef = position === 'bottom' ? 1 : 0
    }

    const newSlidePlacement: number = indexOfEstimatedSlideId + additionalCoef

    return {place: newSlidePlacement, currentSlideId: currentSlideId}
}

interface HTMLInputEvent extends Event
{
    target: HTMLInputElement & EventTarget;
}

export async function getPayloadForDownloadPresentation(event: HTMLInputEvent)
{
    const file = event.target.files ? event.target.files[0] : ''
    const fileReader = new FileReader()
    fileReader.readAsText(file as File)
    return await getPresentationFromFile(fileReader)
}

function getPresentationFromFile(fileReader: FileReader)
{
    return new Promise(resolve =>
    {
        fileReader.onload = () =>
        {
            const JSONString = fileReader.result
            if (typeof JSONString === 'string' && JSONString.slice(2, 6) === 'name')
            {
                resolve(getPresentationFromJSON(JSONString))
            }
        }
    })
}

export function getPayloadForAddObject(objectType: 'image' | 'triangle' | 'rectangle' | 'circle' | 'text'): SlideObject
{
    switch (objectType)
    {
        case 'triangle':
            return getDefaultTriangle()
        case 'rectangle':
            return getDefaultRectangle()
        case 'circle':
            return getDefaultCircle()
        case 'text':
            return getDefaultText()
        default:
            return getDefaultRectangle()
    }
}

export async function getPayloadForDownloadImage(event: HTMLInputEvent)
{
    const file = event.target.files ? event.target.files[0] : ''
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file as File)
    return await getSourceFromFile(fileReader)
}

function getSourceFromFile(fileReader: FileReader)
{
    return new Promise(resolve => fileReader.onload = () => resolve(fileReader.result))
}