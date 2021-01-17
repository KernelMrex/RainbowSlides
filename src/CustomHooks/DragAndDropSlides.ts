import React, {useState, RefObject} from 'react';
import { useDragAndDropFake } from './DragAndDropFake';
import { HorizontalLineSlides } from '../Presentation/SlideList/SlideList';
import { getPayloadForChangeSlidePosition } from '../common/createPayloads';
import { Presentation } from '../core/types';
import {PresentationActionType} from "../store/presentation/types";

export const useDragAndDropSlides = (
    element: RefObject<HTMLDivElement>,
    currentSlideId: string,
    changeSlideEstimatedId: (hr: HorizontalLineSlides) => void,
    callbackChangeSlidePosition: (place: number, currentId: string) => PresentationActionType,
    presentation: Presentation) =>
{
    const [estimatedSlideId, setEstimatedSlideId] = useState('');

    useDragAndDropFake(element, setModelPos, setViewPos, currentSlideId)

    function setModelPos(position: 'bottom' | 'top')
    {
        changeSlideEstimatedId({id: '', position: ''})
        setEstimatedSlideId('')
        const payload: {place: number, currentSlideId: string} = getPayloadForChangeSlidePosition(presentation, estimatedSlideId, currentSlideId, position)
        callbackChangeSlidePosition(payload.place, payload.currentSlideId)
    }

    function setViewPos(hr: HorizontalLineSlides)
    {
        setEstimatedSlideId(hr.id)
        changeSlideEstimatedId(hr)
    }
}
