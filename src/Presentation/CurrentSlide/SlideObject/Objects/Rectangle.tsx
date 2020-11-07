import React from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';

interface SlideObjects
{
    object: type.RectangleBlock
    coef: number
}

export default function Rectangle(props: SlideObjects)
{
    return (
        <svg className={style.wrapper} width={(props.object.width + props.object.position.x) / props.coef}
             height={(props.object.height + props.object.position.y) / props.coef}>
            <rect
                x={props.object.position.x / props.coef}
                y={props.object.position.y / props.coef}
                width={props.object.width / props.coef}
                height={props.object.height / props.coef}>
            </rect>
        </svg>
    )
}