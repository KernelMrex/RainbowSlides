import React from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';

interface SlideObjects
{
    object: type.TriangleBlock
    coef: number
    selectObject: Function
    isSelected: boolean
}

export default function Triangle(props: SlideObjects)
{
    const width: number = props.object.width  / props.coef;
    const height: number = props.object.height  / props.coef;
    const x: number = props.object.position.x  / props.coef;
    const y: number = props.object.position.y  / props.coef;
    const points: string = '0 ' + height + ', ' + width / 2 + ' 0, ' + width + ' ' + height;
    return (
        <svg className={style.wrapper} width={width} height={height}
             style={{top: '' + y + 'px', left: '' + x + 'px',
                 border: props.isSelected ? '3px dashed #d3cde4' : ''}}
             onClick={(e) => props.selectObject(props.object, e)}>
            <polygon
                fill={props.object.background.hex}
                points={points}>
            </polygon>
        </svg>
    );
}