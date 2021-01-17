import React from 'react';
import * as type from '../../../../core/types';
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
    setStatusResize: (status: boolean) => void
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
            <HOCTopRight setStatusResize={props.setStatusResize} pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCTopLeft setStatusResize={props.setStatusResize} pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCBottomLeft setStatusResize={props.setStatusResize} pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCBottomRight setStatusResize={props.setStatusResize} pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCTop setStatusResize={props.setStatusResize} pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCBottom setStatusResize={props.setStatusResize} pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCLeft setStatusResize={props.setStatusResize} pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
            <HOCRight setStatusResize={props.setStatusResize} pos={props.pos} physicalParams={props.physicalParams} object={props.object} callbackSize={props.callbackSize} callbackPosition={props.callbackPosition}
                     changeSize={props.changeSize}/>
        </div>
    )
}