import React, {RefObject, useRef} from 'react';
import * as type from '../../../../../core/types';
import ResizerDot from "./ResizerDot";
import {useDragAndDropResize} from '../../../../../CustomHooks/DragAndDropResizer';
import {PhysicalParams, Size, HOCDotsInterface} from './HOCDots';

export default function HOCTopLeft(props: HOCDotsInterface)
{
    function createParamsToModel(newPos?: type.Anchor | undefined): PhysicalParams | undefined
    {
        if (newPos)
        {
            return {
                pos: {x: props.object.position.x + newPos.x, y: props.object.position.y + newPos.y},
                size: {
                    height: props.object.height - newPos.y,
                    width: props.object.width - newPos.x
                }
            }
        }
    }

    function createPosition(newPos: type.Anchor): type.Anchor
    {
        return {
            x: props.object.position.x + newPos.x, y: props.object.position.y + newPos.y
        }
    }

    function createSize(newPos: type.Anchor): Size
    {
        return {
            height: props.object.height - newPos.y,
            width: props.object.width - newPos.x
        }
    }

    const childRef: RefObject<HTMLElement> = useRef(null);
    const position: type.Anchor = {x: -7, y: -7};
    useDragAndDropResize(childRef, props.object, props.callbackSize, props.callbackPosition, props.changeSize, createParamsToModel, createPosition, createSize)

    return (
        <ResizerDot position={position} innerRef={childRef}/>
    )
}