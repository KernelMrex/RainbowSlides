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
    return (
        <svg ref={ref} className={style.wrapper} width={(props.object.width) / props.coef}
             height={(props.object.height) / props.coef}
             style={{top: '' + pos.y / props.coef + 'px',
                 left: '' + pos.x / props.coef + 'px',
                 border: props.isSelected ? '3px dashed #d3cde4' : ''}}
             onClick={(e) => !props.isLock ? props.selectObject(props.object, e) : e.preventDefault()}>
            <ellipse
                fill={props.object.background.hex}
                cx={(props.object.width / 2) / props.coef}
                cy={(props.object.height / 2) / props.coef}
                rx={(props.object.width / 2) / props.coef}
                ry={(props.object.height / 2) / props.coef}>
            </ellipse>
        </svg>
    );
}