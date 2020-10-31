import React from 'react';
import * as type from '../../../../core/types';

interface SlideObjects
{
    class: string
    object: type.CircleBlock
}

export default function Circle(props: SlideObjects)
{
    return (
        <svg className={props.class} width={props.object.width + props.object.position.x}
             height={props.object.height + props.object.position.y}>
            <ellipse
                fill={props.object.background.hex}
                cx={Math.abs(props.object.position.x + props.object.width / 2)}
                cy={Math.abs(props.object.position.y + props.object.height / 2)}
                rx={Math.min(props.object.width / 2)}
                ry={Math.min(props.object.height / 2)}>
            </ellipse>
        </svg>
    );
}