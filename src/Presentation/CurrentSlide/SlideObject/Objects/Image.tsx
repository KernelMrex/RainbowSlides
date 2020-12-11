import React from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';


interface SlideObjects
{
    object: type.ImageBlock
    coef: number
    selectObject: Function
    isSelected: boolean
    isLock: boolean
}

export default function Image(props: SlideObjects)
{
    const objectStyle = {
        maxWidth: props.object.width / props.coef,
        maxHeight: props.object.height / props.coef,
        left: props.object.position.x / props.coef + 'px',
        top: props.object.position.y / props.coef + 'px',
        border: props.isSelected ? '3px dashed #d3cde4' : ''
    };

    return (
        <div onSelect={(e) => console.log('fj')} className={style.wrapper} style={objectStyle} onClick={(e) => !props.isLock ? props.selectObject(props.object, e) : e.preventDefault()}>
            <img src={props.object.source} className={style.media}/>
        </div>
    );
}