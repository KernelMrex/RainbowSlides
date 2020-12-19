import React from 'react';
import * as type from '../../../../../core/types';
import HOCTopLeft from "./HOCTopLeft";
import HOCTopRight from './HOCTopRight';

export interface HOCDotsInterface
{
    object: type.SlideObject
    callbackSize: Function
    callbackPosition: Function
    changeSize: Function
    pos: type.Anchor
    physicalParams: Size
}

export type PhysicalParams = {
    pos: type.Anchor,
    size: Size
}

export type Size = {
    height: number,
    width: number
}

export default function HOCDots(props: HOCDotsInterface)
{
    return (
        <div>
            <HOCTopLeft pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCTopRight pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
        </div>
    )
}