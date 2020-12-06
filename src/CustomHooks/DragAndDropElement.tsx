import React, {useState, useEffect, useCallback} from 'react';
import * as type from '../core/types';
import {useDragAndDrop} from './DragAndDrop'

export const useDragAndDropElement = (element: Element | null, changePosition: Function, object: type.RectangleBlock, isLock: boolean) =>
{
    const [pos, setPos] = useState(object.position);
    useDragAndDrop(element, setDeltaPos);

    function setDeltaPos(delta: type.Anchor)
    {
        if (!isLock)
        {
            let newPos: type.Anchor = {
                x: delta.x + pos.x,
                y: delta.y + pos.y
            }

            setPos(newPos);
            changePosition(object, newPos)
        }
    }

    return {
        ...pos
    }
}