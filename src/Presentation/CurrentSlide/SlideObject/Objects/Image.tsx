import React, { useState, useRef } from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';
import { useDragAndDropElement } from '../../../../CustomHooks/DragAndDropElement';


interface SlideObjects
{
    object: type.ImageBlock
    coef: number
    selectObject: Function
    changePosition: Function
    isSelected: boolean
    isLock: boolean
}

export default function Image(props: SlideObjects)
{
    const [pos, setNewPos] = useState(props.object.position);
    const ref = useRef(null);
    useDragAndDropElement(ref.current, props.changePosition, setNewPos, props.object, props.isLock);
    if (props.isLock && pos !== props.object.position)
    {
        setNewPos(props.object.position)
    }
    const objectStyle = {
        width: props.object.width / props.coef,
        height: props.object.height / props.coef,
        left: pos.x / props.coef + 'px',
        top: pos.y / props.coef + 'px',
        border: props.isSelected ? '3px dashed #d3cde4' : ''
    };

    return (
        <div ref={ref} className={style.wrapper} style={objectStyle} onClick={(e) => !props.isLock ? props.selectObject(props.object, e) : e.preventDefault()}>
            <img src={props.object.source} className={style.media}/>
        </div>
    );
}