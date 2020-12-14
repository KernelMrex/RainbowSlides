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

    const width: number = props.object.width / props.coef;
    const height: number = props.object.height / props.coef;
    const x: number = props.isSelected ? pos.x - 3 / props.coef : pos.x / props.coef;
    const y: number = props.isSelected ? pos.y - 3 / props.coef : pos.y / props.coef;

    const objectStyle = {
        width: width,
        height: height,
        left: x + 'px',
        top: y + 'px',
        border: props.isSelected ? '3px solid transparent' : '',
        outline: props.isSelected ? '2px dashed #d3cde4' : 'none'
    };

    return (
        <div ref={ref} className={style.wrapper} style={objectStyle} onClick={(e) => !props.isLock ? props.selectObject(props.object, e) : e.preventDefault()}>
            <img src={props.object.source} className={style.media}/>
        </div>
    );
}