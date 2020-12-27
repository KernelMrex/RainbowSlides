import React, {RefObject} from 'react';
import * as type from '../../../../../core/types';
import style from '../Objects.module.css'

interface ResizerDot
{
    position: type.Anchor
    innerRef: RefObject<HTMLElement>
}

export default function ResizerDot(props: ResizerDot)
{
    return (
        <span
            ref={props.innerRef}
            className={style.resizerDot}
            style={{
                top: props.position.y + 'px',
                left: props.position.x + 'px'
            }}>
        </span>
    )
}