import React from 'react';
import * as type from '../../../../core/types';

interface SlideObjects
{
    class: string
    object: type.TriangleBlock
}

export default function Triangle(props: SlideObjects)
{
    const width: number = props.object.width;
    const height: number = props.object.height;
    const x: number = props.object.position.x;
    const y: number = props.object.position.y;
    const points: string = '' + x + ' ' + (y + height) + ', ' + (x + width / 2) + ' ' + y + ', ' + (x + width) + ' ' + (y + height);
    return (
        <svg className={props.class} width={width + x} height={height + y}>
            <polygon
                fill={props.object.background.hex}
                points={points}>
            </polygon>
        </svg>
    );
}