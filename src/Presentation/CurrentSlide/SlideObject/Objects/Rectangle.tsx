import React from 'react';
import * as type from '../../../../core/types';

interface SlideObjects
{
    class: string
    object: type.RectangleBlock
}

export default function Rectangle(props: SlideObjects)
{
    return (
        <svg className={props.class} width={props.object.width + props.object.position.x}
             height={props.object.height + props.object.position.y}>
            <rect
                x={props.object.position.x}
                y={props.object.position.y}
                width={props.object.width}
                height={props.object.height}>
            </rect>
        </svg>
    )
}