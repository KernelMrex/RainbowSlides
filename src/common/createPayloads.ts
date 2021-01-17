import { Presentation } from "../core/types"

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