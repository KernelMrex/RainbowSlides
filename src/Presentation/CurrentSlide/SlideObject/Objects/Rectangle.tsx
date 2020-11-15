import React from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';

interface SlideObjects
{
    object: type.RectangleBlock
    coef: number
    selectObject: Function
    isSelected: boolean
}

export default function Rectangle(props: SlideObjects)
{
    return (
        <svg className={style.wrapper}
             width={(props.object.width) / props.coef}
             height={(props.object.height) / props.coef}
             style={{top: '' + props.object.position.y / props.coef + 'px',
                 left: '' + props.object.position.x / props.coef + 'px',
                 border: props.isSelected ? '3px dashed #d3cde4' : ''}}
             onClick={(e) => props.selectObject(props.object, e)}>
            <rect
                width={props.object.width / props.coef}
                height={props.object.height / props.coef}>
            </rect>
        </svg>
    )
}