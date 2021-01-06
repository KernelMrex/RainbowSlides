import React, {RefObject, useRef} from 'react';
import * as type from '../../../../../core/types';
import ResizerDot from "./ResizerDot";
import {useDragAndDropResize} from '../../../../../CustomHooks/DragAndDropResizer';
import {PhysicalParams, Size, HOCDotsInterface} from './HOCDots';

export default function HOCTop(props: HOCDotsInterface)
{
    function createParamsToModel(newPos: type.Anchor): PhysicalParams
    {
        return {
            pos: createPosition(newPos),
            size: {
                ...createSize(newPos)
            }
        }
    }

    function createPosition(newPos: type.Anchor): type.Anchor
    {
        return {
            x: props.object.position.x, y: props.object.position.y + newPos.y
        }
    }

    function createSize(newPos: type.Anchor): Size
    {
        return {
            height: props.object.height - newPos.y,
            width: props.object.width
        }
    }

    const childRef: RefObject<HTMLElement> = useRef(null);
    const position: type.Anchor = {x: props.physicalParams.width / 2 - 2, y: -7};
    useDragAndDropResize(childRef, props.object, props.callbackSize, props.callbackPosition, props.changeSize, createParamsToModel, createPosition, createSize)

    return (
        <ResizerDot position={position} innerRef={childRef}/>
    )
}