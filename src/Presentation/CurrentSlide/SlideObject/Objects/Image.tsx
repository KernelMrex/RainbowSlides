import React, { useState, useRef } from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';
import { useDragAndDropElement } from '../../../../CustomHooks/DragAndDropElement';
import HOCDots from './Resizers/HOCDots';
import {PointerType} from "../SlideObject";


interface SlideObjects
{
    object: type.ImageBlock
    coef: number
    selectObject: Function
    changeSize: Function
    changePosition: (obj: type.SlideObject, pos: type.Anchor) => void
    isSelected: boolean
    isLock: boolean
}

export default function Image(props: SlideObjects)
{
    const [pos, setNewPos] = useState(props.object.position);
    const ref = useRef(null);
    const [physicalParams, setNewPhysicalParams] = useState({height: props.object.height, width: props.object.width});
    useDragAndDropElement(ref, props.changePosition, setNewPos, props.object, pos, props.isLock);

    if (props.isLock && pos !== props.object.position)
    {
        setNewPos(props.object.position)
    }

    if (props.isLock && (physicalParams.width !== props.object.width || physicalParams.height !== props.object.height))
    {
        setNewPhysicalParams({height: props.object.height, width: props.object.width})
    }

    const width: number = physicalParams.width / props.coef;
    const height: number = physicalParams.height / props.coef;
    const x: number = props.isSelected ? pos.x - 3 / props.coef : pos.x / props.coef;
    const y: number = props.isSelected ? pos.y - 3 / props.coef : pos.y / props.coef;

    const pointerLock: PointerType = props.isLock ? "none" : undefined

    const objectStyle = {
        width: width,
        height: height,
        left: x + 'px',
        top: y + 'px',
        border: props.isSelected ? '3px solid transparent' : '',
        outline: props.isSelected ? '2px dashed #d3cde4' : 'none',
        pointerEvents: pointerLock
    };

    return (
        <div className={style.wrapper} style={objectStyle} onClick={(e) => !props.isLock ? props.selectObject(props.object) : e.preventDefault()}>
            {!props.isLock && props.isSelected &&
            <HOCDots object={props.object} pos={pos} physicalParams={physicalParams} callbackSize={setNewPhysicalParams}
                     callbackPosition={setNewPos}
                     changeSize={props.changeSize}/>
            }
            <img ref={ref}  src={props.object.source} className={style.media}/>
        </div>
    );
}