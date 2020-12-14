import React, { useState, useRef } from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';
import { useDragAndDropElement } from '../../../../CustomHooks/DragAndDropElement';

interface SlideObjects
{
    object: type.CircleBlock
    coef: number
    selectObject: Function
    changePosition: Function
    isSelected: boolean
    isLock: boolean
}

export default function Circle(props: SlideObjects)
{
    const [pos, setNewPos] = useState(props.object.position);
    const ref = useRef(null);
    useDragAndDropElement(ref.current, props.changePosition, setNewPos, props.object, props.isLock);
    if (props.isLock && pos !== props.object.position)
    {
        setNewPos(props.object.position)
    }

    const width: number = props.object.width / props.coef;
    const height: number = props.object.height / props.coef;
    const x: number = props.isSelected ? pos.x - 3 / props.coef : pos.x / props.coef;
    const y: number = props.isSelected ? pos.y - 3 / props.coef : pos.y / props.coef;

    return (
        <svg ref={ref}
             className={style.wrapper}
             width={width}
             height={height}
             style={{
                 top: '' + y + 'px',
                 left: '' + x + 'px',
                 border: props.isSelected ? '3px solid transparent' : '',
                 outline: props.isSelected ? '2px dashed #d3cde4' : 'none'
             }}
             onClick={(e) => !props.isLock ? props.selectObject(props.object, e) : e.preventDefault()}>
            <ellipse
                fill={props.object.background.hex}
                cx={width / 2}
                cy={height / 2}
                rx={width / 2}
                ry={height / 2}>
            </ellipse>
        </svg>
    );
}