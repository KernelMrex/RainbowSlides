import {Presentation, SlideObject} from "../core/types"
import * as type from "../core/types";
import {createPresentation, getPresentationFromJSON} from "../core/presentation/presentation";
import {DOWNLOAD_PRESENTATION} from "../store/presentation/types";
import {
    AddObjectToSlidePayload,
    getDefaultTriangle,
    getDefaultRectangle,
    getDefaultCircle,
    getDefaultText
} from "../core/objects/objects";

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
    const presentation = await getPresentationFromFile(fileReader)
    return presentation
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
        {
            return getDefaultTriangle()
            break
        }
        case 'rectangle':
        {
            return getDefaultRectangle()
            break
        }
        case 'circle':
        {
            return getDefaultCircle()
            break
        }
        case 'text':
        {
            return getDefaultText()
            break
        }
        default:
        {
            return getDefaultRectangle()
        }
    }
}

export async function getPayloadForDownloadImage(event: HTMLInputEvent)
{
    const file = event.target.files ? event.target.files[0] : ''
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file as File)
    const source = await getSourceFromFile(fileReader)
    return source
}

function getSourceFromFile(fileReader: FileReader)
{
    return new Promise(resolve =>
    {
        fileReader.onload = () =>
        {
            const JSONString = fileReader.result
            resolve(JSONString)
        }
    })
}