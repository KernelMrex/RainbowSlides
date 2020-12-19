import React, { useState, useRef } from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';
import { useDragAndDropElement } from '../../../../CustomHooks/DragAndDropElement';

interface SlideObjects
{
    object: type.TriangleBlock
    coef: number
    selectObject: Function
    changeSize: Function
    changePosition: (obj: type.SlideObject, pos: type.Anchor) => void
    isSelected: boolean
    isLock: boolean
}

export default function Triangle(props: SlideObjects)
{
    const [pos, setNewPos] = useState(props.object.position);
    const ref = useRef(null);
    useDragAndDropElement(ref, props.changePosition, setNewPos, props.object, props.isLock);
    if (props.isLock && pos !== props.object.position)
    {
        setNewPos(props.object.position)
    }

    const width: number = props.object.width  / props.coef;
    const height: number = props.object.height  / props.coef;
    const x: number = props.isSelected ? pos.x - 3 / props.coef : pos.x / props.coef;
    const y: number = props.isSelected ? pos.y - 3 / props.coef : pos.y / props.coef;
    const points: string = '0 ' + height + ', ' + width / 2 + ' 0, ' + width + ' ' + height;

    return (
        <svg ref={ref}
             className={style.wrapper}
             width={width} height={height}
             style={{
                 top: '' + y + 'px',
                 left: '' + x + 'px',
                 border: props.isSelected ? '3px solid transparent' : '',
                 outline: props.isSelected ? '2px dashed #d3cde4' : 'none'
             }}
             onClick={(e) => !props.isLock ? props.selectObject(props.object) : e.preventDefault()}>
            <polygon
                fill={props.object.background.hex}
                points={points}>
            </polygon>
        </svg>
    );
}