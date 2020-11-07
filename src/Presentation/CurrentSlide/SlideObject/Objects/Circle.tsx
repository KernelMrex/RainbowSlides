import React from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';

interface SlideObjects
{
    object: type.CircleBlock
    coef: number
}

export default function Circle(props: SlideObjects)
{
    return (
        <svg className={style.wrapper} width={(props.object.width + props.object.position.x) / props.coef}
             height={(props.object.height + props.object.position.y) / props.coef}>
            <ellipse
                fill={props.object.background.hex}
                cx={(props.object.position.x + props.object.width / 2) / props.coef}
                cy={(props.object.position.y + props.object.height / 2) / props.coef}
                rx={(props.object.width / 2) / props.coef}
                ry={(props.object.height / 2) / props.coef}>
            </ellipse>
        </svg>
    );
}