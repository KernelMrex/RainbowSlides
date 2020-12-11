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
            console.log(newPosition)
            console.log(object.position)
            let deltaPosition: type.Anchor = {
                // x: newPosition.x - pos.x - 418,
                // y: newPosition.y - pos.y - 103
                x: pos.x - object.position.x,
                y: pos.y - object.position.y
            }

            console.log('setting in model')
            console.log(deltaPosition)
            changePosition(object, deltaPosition)
            console.log('Results')
            console.log(pos)
            console.log(object.position)
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
            console.log(delta)
            console.log(object.position)

            setNewPos(newPos)
            setPos(newPos)
        }
    }
}