import React from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';

interface SlideObjects
{
    object: type.TriangleBlock
    coef: number
}

export default function Triangle(props: SlideObjects)
{
    const width: number = props.object.width  / props.coef;
    const height: number = props.object.height  / props.coef;
    const x: number = props.object.position.x  / props.coef;
    const y: number = props.object.position.y  / props.coef;
    const points: string = '' + x + ' ' + (y + height) + ', ' + (x + width / 2) + ' ' + y + ', ' + (x + width) + ' ' + (y + height);
    return (
        <svg className={style.wrapper} width={width + x} height={height + y}>
            <polygon
                fill={props.object.background.hex}
                points={points}>
            </polygon>
        </svg>
    );
}