import React from 'react';
import * as type from '../../../../../core/types';
import HOCTopLeft from "./HOCTopLeft";
import HOCTopRight from './HOCTopRight';
import HOCBottomLeft from './HOCBottomLeft';
import HOCBottomRight from './HOCBottomRight';
import HOCTop from './HOCTop';
import HOCBottom from './HOCBottom';
import HOCLeft from './HOCLeft';
import HOCRight from "./HOCRight";

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
            <HOCTopRight pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCTopLeft pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCBottomLeft pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCBottomRight pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCTop pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCBottom pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCLeft pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCRight pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
        </div>
    )
}