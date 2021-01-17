import React, {RefObject, useRef} from 'react';
import * as type from '../../../../core/types';
import ResizerDot from "./ResizerDot";
import {HOCDotsInterface, PhysicalParams, Size} from "./HOCDots";
import {useDragAndDropResize} from "../../../../CustomHooks/DragAndDropResizer";

export default function HOCBottomRight(props: HOCDotsInterface)
{
    function createParamsToModel(newPos: type.Anchor): PhysicalParams
    {
        return {
            pos: createPosition(),
            size: {
                ...createSize(newPos)
            }
        }
    }

    function createPosition(): type.Anchor
    {
        return {
            x: props.object.position.x, y: props.object.position.y
        }
    }

    function createSize(newPos: type.Anchor): Size
    {
        return {
            height: props.object.height + newPos.y,
            width: props.object.width + newPos.x
        }
    }

    const childRef: RefObject<HTMLElement> = useRef(null);

    useDragAndDropResize(childRef, props.object, props.callbackSize, props.callbackPosition, props.changeSize, createParamsToModel, createPosition, createSize, props.setStatusResize)
    const position: type.Anchor = {x: props.physicalParams.width + 3, y: props.physicalParams.height + 3};
    return (
        <ResizerDot position={position} innerRef={childRef}/>
    )
}
