import React from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';


interface SlideObjects
{
    object: type.ImageBlock
    coef: number
}

export default function Image(props: SlideObjects)
{
    const objectStyle = {
        maxWidth: props.object.width / props.coef,
        maxHeight: props.object.height / props.coef,
        left: props.object.position.x / props.coef + 'px',
        top: props.object.position.y / props.coef + 'px',
    };

    return (
        <div className={style.wrapper} style={objectStyle}>
            <img src={props.object.source} className={style.media}/>
        </div>
    );
}