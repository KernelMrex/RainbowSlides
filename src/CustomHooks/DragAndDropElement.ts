import React, {useState, RefObject} from 'react';
import * as type from '../core/types';
import {useDragAndDrop} from './DragAndDrop'
import {PresentationActionType} from '../store/presentation/types';

export const useDragAndDropElement = (
    element: RefObject<HTMLElement>,
    changePosition: (newPosition: type.Anchor) => PresentationActionType,
    setNewPos: (pos: type.Anchor) => void,
    object: type.SlideObject,
    pos: type.Anchor,
    isLock: boolean,
    selectObject: (objectId: string) => PresentationActionType,
    setStatusDragAndDrop: (status: boolean) => void) =>
{
    const [deltaPos, setPos] = useState(pos)

    useDragAndDrop(element, setModelPos, setViewPos)

    function setModelPos()
    {
        setStatusDragAndDrop(false)
        if (!isLock)
        {
            if (deltaPos !== object.position)
            {
                console.log(pos)
                changePosition(pos)
                setPos(pos)
            }
        } else
        {
            setNewPos(deltaPos)
        }
    }

    function setViewPos(delta: type.Anchor)
    {
        selectObject(object.id)
        if (!isLock)
        {
            let newPos: type.Anchor = {
                x: delta.x + pos.x,
                y: delta.y + pos.y
            }
            setStatusDragAndDrop(true)
            setNewPos(newPos)
            setPos(newPos)
        }
    }
}