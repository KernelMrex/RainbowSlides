import React, {useState, RefObject, MutableRefObject} from 'react';
import * as type from '../core/types';
import {useDragAndDrop} from './DragAndDrop';
import { PhysicalParams, Size } from '../Presentation/CurrentSlide/SlideObject/Objects/Resizers/HOCDots';

export const useDragAndDropResize = (
    element: RefObject<HTMLElement>,
    object: type.SlideObject,
    callbackSize: Function,
    callbackPosition: Function,
    changeSize: Function,
    createParamsToModel: (newPos?: type.Anchor | undefined) => (PhysicalParams | undefined),
    createPosition: (newPos: type.Anchor) => type.Anchor,
    createSize: (newPos: type.Anchor) => Size) =>
{
    const [pos, setNewPos] = useState({x: 0, y: 0})
    useDragAndDrop(element, setModelParams, setViewParams)

    console.log(element.current)

    function setModelParams()
    {
        let newPosition: type.Anchor = {
            x: pos.x,
            y: pos.y
        }
        const physicalParams: PhysicalParams | undefined = createParamsToModel(newPosition);
        if (physicalParams)
        {
            changeSize(physicalParams.pos, physicalParams.size.height, physicalParams.size.width)
        }
    }

    function setViewParams(delta: type.Anchor)
    {
        const newPos: type.Anchor = {
            x: delta.x + pos.x,
            y: delta.y + pos.y
        }
        const newSize: Size = createSize(newPos);

        setNewPos(newPos)
        if (newSize.height < 10 || newSize.width < 10)
        {
            callbackSize({x: 10, y: 10})
            callbackPosition(createPosition({x: 10, y: 10}))
        } else
        {
            callbackPosition(createPosition(newPos))
            callbackSize(newSize)
        }
    }
}