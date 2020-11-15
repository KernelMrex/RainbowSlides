import React from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';

interface SlideObjects
{
    object: type.CircleBlock
    coef: number
    selectObject: Function
    isSelected: boolean
    isLock: boolean
}

export default function Circle(props: SlideObjects)
{
    return (
        <svg className={style.wrapper} width={(props.object.width) / props.coef}
             height={(props.object.height) / props.coef}
             style={{top: '' + props.object.position.y / props.coef + 'px',
                 left: '' + props.object.position.x / props.coef + 'px',
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