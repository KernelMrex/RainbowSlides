import React, {useState, useEffect, useCallback} from 'react';
import * as type from '../core/types';
import {useDragAndDrop} from './DragAndDrop'

export const useDragAndDropElement = (element: Element | null, changePosition: Function, setNewPos: Function, object: type.SlideObject, isLock: boolean) =>
{
    const [pos, setPos] = useState(object.position)
    useDragAndDrop(element, setDeltaPos, setViewPos)

    function setDeltaPos(newPosition: type.Anchor)
    {
        if (!isLock)
        {
            let deltaPosition: type.Anchor = {
                x: pos.x,
                y: pos.y
            }
            changePosition(object, deltaPosition)
        } else
        {
            setNewPos(pos)
        }
    }

    function setViewPos(delta: type.Anchor)
    {
        if (!isLock)
        {
            let newPos: type.Anchor = {
                x: delta.x + pos.x,
                y: delta.y + pos.y
            }

            setNewPos(newPos)
            setPos(newPos)
        }
    }
}