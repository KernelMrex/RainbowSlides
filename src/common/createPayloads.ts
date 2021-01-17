import {Presentation} from "../core/types"
import * as type from "../core/types";
import {createPresentation, getPresentationFromJSON} from "../core/presentation/presentation";
import {DOWNLOAD_PRESENTATION} from "../store/presentation/types";

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

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export async function getPayloadForDownloadPresentation(event: HTMLInputEvent)
{
    const file = event.target.files ? event.target.files[0] : ''
    const fileReader = new FileReader()
    let newPresentation: type.Presentation = createPresentation({})
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