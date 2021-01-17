import React, {useState, RefObject} from 'react';
import * as type from '../core/types';
import {useDragAndDrop} from './DragAndDrop';
import {PhysicalParams, Size} from '../CurrentSlide/SlideObject/Objects/Resizers/HOCDots';

export const useDragAndDropResize = (
    element: RefObject<HTMLElement>,
    object: type.SlideObject,
    callbackSize: Function,
    callbackPosition: Function,
    changeSize: Function,
    createParamsToModel: (newPos: type.Anchor) => PhysicalParams,
    createPosition: (newPos: type.Anchor) => type.Anchor,
    createSize: (newPos: type.Anchor) => Size,
    setStatusResize: (status: boolean) => void) =>
{
    const [pos, setNewPos] = useState({x: 0, y: 0})
    useDragAndDrop(element, setModelParams, setViewParams)

    function setModelParams()
    {
        setStatusResize(false)
        let newPosition: type.Anchor = {
            x: pos.x,
            y: pos.y
        }
        const physicalParams: PhysicalParams | undefined = createParamsToModel(newPosition);
        if (physicalParams)
        {
            changeSize(physicalParams.pos, physicalParams.size.height, physicalParams.size.width)
        }

        setNewPos({x: 0, y: 0})
    }

    function setViewParams(delta: type.Anchor)
    {
        setStatusResize(true)
        const newPos: type.Anchor = {
            x: delta.x + pos.x,
            y: delta.y + pos.y
        }
        const newSize: Size = createSize(newPos);
        if (newSize.width > 10 && newSize.height > 10)
        {
            setNewPos(newPos)
            callbackPosition(createPosition(newPos))
            callbackSize(newSize)
        }
    }
}