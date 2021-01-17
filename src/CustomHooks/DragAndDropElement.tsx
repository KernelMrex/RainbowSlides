import React, {useState, RefObject} from 'react';
import * as type from '../core/types';
import {useDragAndDrop} from './DragAndDrop'
import { PresentationActionType } from '../store/presentation/types';

export const useDragAndDropElement = (
    element: RefObject<HTMLElement>,
    changePosition: (newPosition: type.Anchor) => PresentationActionType,
    setNewPos: (pos: type.Anchor) => void,
    object: type.SlideObject,
    pos: type.Anchor,
    isLock: boolean,
    selectObject: (objectId: string) => PresentationActionType) =>
{
    const [deltaPos, setPos] = useState(pos)

    useDragAndDrop(element, setModelPos, setViewPos)

    function setModelPos()
    {
        if (!isLock)
        {
            changePosition(pos)
            setPos(pos)
        } else
        {
            setNewPos(deltaPos)
            setPos(deltaPos)
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

            setNewPos(newPos)
            setPos(newPos)
        }
    }
}