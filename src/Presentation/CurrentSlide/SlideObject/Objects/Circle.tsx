import React, {useState, useRef} from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';
import {useDragAndDropElement} from '../../../../CustomHooks/DragAndDropElement';
import HOCDots from "./Resizers/HOCDots";
import { PointerType } from '../SlideObject';

interface SlideObjects
{
    object: type.CircleBlock
    coef: number
    selectObject: Function
    changeSize: Function
    changePosition: (obj: type.SlideObject, pos: type.Anchor) => void
    isSelected: boolean
    isLock: boolean
}

export default function Circle(props: SlideObjects)
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

    return (
        <div className={style.wrapper}
             style={{
                 width: width,
                 height: height,
                 top: '' + y + 'px',
                 left: '' + x + 'px',
                 pointerEvents: pointerLock
             }}>
            {!props.isLock && props.isSelected &&
            <HOCDots object={props.object} pos={pos} physicalParams={physicalParams} callbackSize={setNewPhysicalParams}
                     callbackPosition={setNewPos}
                     changeSize={props.changeSize}/>
            }
            <svg
                width={width}
                height={height}
                style={{
                    top: '' + y + 'px',
                    left: '' + x + 'px',
                    border: props.isSelected ? '3px solid transparent' : '',
                    outline: props.isSelected ? '2px dashed #d3cde4' : 'none'
                }}
                onClick={(e) => !props.isLock ? props.selectObject(props.object) : e.preventDefault()}>
                <ellipse
                    ref={ref}
                    fill={props.object.background.hex}
                    cx={width / 2}
                    cy={height / 2}
                    rx={width / 2}
                    ry={height / 2}>
                </ellipse>
            </svg>
        </div>
    );
}