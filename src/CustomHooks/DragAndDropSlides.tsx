import React, {useState, RefObject} from 'react';
import { useDragAndDropFake } from './DragAndDropFake';
import { HorizontalLineSlides } from '../Presentation/SlideList/SlideList';

export const useDragAndDropSlides = (
    element: RefObject<HTMLDivElement>,
    currentSlideId: string,
    changeSlideEstimatedId: (hr: HorizontalLineSlides) => void,
    callbackChangeSlidePosition: (estimateSlideId: string, currentSlideId: string, position: 'bottom' | 'top') => void) =>
{
    const [estimatedSlideId, setEstimatedSlideId] = useState('');

    useDragAndDropFake(element, setModelPos, setViewPos, currentSlideId)

    function setModelPos(position: 'bottom' | 'top')
    {
        changeSlideEstimatedId({id: '', position: ''})
        setEstimatedSlideId('')
        callbackChangeSlidePosition(estimatedSlideId, currentSlideId, position)
    }

    function setViewPos(hr: HorizontalLineSlides)
    {
        setEstimatedSlideId(hr.id)
        changeSlideEstimatedId(hr)
    }
}
