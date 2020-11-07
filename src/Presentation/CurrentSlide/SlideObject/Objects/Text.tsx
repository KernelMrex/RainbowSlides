import React from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';

interface SlideObjects
{
    object: type.TextBlock
    coef: number
}

export default function Text(props: SlideObjects)
{
    const objectStyle = {
        maxWidth: props.object.width / props.coef,
        maxHeight: props.object.height / props.coef,
        left: props.object.position.x / props.coef + 'px',
        top: props.object.position.y / props.coef + 'px',
        background: props.object.background.hex,
        color: props.object.color.hex,
        fontFamily: props.object.font.family,
        fontSize: props.object.font.size / props.coef + 'px',
        fontStyle: props.object.font.style,
        fontWeight: props.object.font.weight
    };

    return (
        <div className={style.wrapper} style={objectStyle}>
            <p>{props.object.content}</p>
        </div>
    );
}