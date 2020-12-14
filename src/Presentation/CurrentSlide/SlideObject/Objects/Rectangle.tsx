import React, {useRef, useState} from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';
import {useDragAndDrop} from '../../../../CustomHooks/DragAndDrop';
import {useDragAndDropElement} from '../../../../CustomHooks/DragAndDropElement';

interface SlideObjects
{
    object: type.RectangleBlock
    coef: number
    selectObject: Function
    changePosition: (obj: type.SlideObject, pos: type.Anchor) => void
    isSelected: boolean
    isLock: boolean
}

export default function Rectangle(props: SlideObjects)
{
    const [pos, setNewPos] = useState(props.object.position);
    const ref = useRef(null);
    useDragAndDropElement(ref, props.changePosition, setNewPos, props.object, props.isLock);
    if (props.isLock && pos !== props.object.position)
    {
        setNewPos(props.object.position)
    }

    const width: number = props.object.width / props.coef;
    const height: number = props.object.height / props.coef;
    const x: number = props.isSelected ? pos.x - 3 / props.coef : pos.x / props.coef;
    const y: number = props.isSelected ? pos.y - 3 / props.coef : pos.y / props.coef;

    return (
        <svg className={style.wrapper}
             ref={ref}
             width={width}
             height={height}
             style={{
                 top: '' + y + 'px',
                 left: '' + x + 'px',
                 border: props.isSelected ? '3px solid transparent' : '',
                 outline: props.isSelected ? '2px dashed #d3cde4' : 'none',
             }}
             onClick={(e) => !props.isLock ? props.selectObject(props.object) : e.preventDefault()}>
            <rect
                width={width}
                height={height}>
            </rect>
        </svg>
    )
}