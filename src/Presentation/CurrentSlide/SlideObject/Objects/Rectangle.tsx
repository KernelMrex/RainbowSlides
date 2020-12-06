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
    changePosition: Function
    isSelected: boolean
    isLock: boolean
}

export default function Rectangle(props: SlideObjects)
{
    const ref = useRef(null);
    useDragAndDropElement(ref.current, props.changePosition, props.object, props.isLock);

    return (
        <svg className={style.wrapper}
             ref={ref}
             width={(props.object.width) / props.coef}
             height={(props.object.height) / props.coef}
             style={{
                 top: '' + props.object.position.y / props.coef + 'px',
                 left: '' + props.object.position.x / props.coef + 'px',
                 border: props.isSelected ? '3px dashed #d3cde4' : ''
             }}
             onClick={(e) => !props.isLock ? props.selectObject(props.object, e) : e.preventDefault()}>
            <rect
                width={props.object.width / props.coef}
                height={props.object.height / props.coef}>
            </rect>
        </svg>
    )
}