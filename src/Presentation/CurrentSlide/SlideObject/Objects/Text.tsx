import React, { useState, useRef } from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';
import { useDragAndDropElement } from '../../../../CustomHooks/DragAndDropElement';

interface SlideObjects
{
    object: type.TextBlock
    coef: number
    selectObject: Function
    changePosition: Function
    isSelected: boolean
    isLock: boolean
}

export default function Text(props: SlideObjects)
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
        maxHeight: props.object.height / props.coef,
        left: pos.x / props.coef + 'px',
        top: pos.y / props.coef + 'px',
        background: props.object.background.hex,
        color: props.object.color.hex,
        fontFamily: props.object.font.family,
        fontSize: props.object.font.size / props.coef + 'px',
        fontStyle: props.object.font.style,
        fontWeight: props.object.font.weight,
        border: props.isSelected ? '3px dashed #d3cde4' : ''
    };
    return (
        <div ref={ref} className={style.wrapper} style={objectStyle} onClick={(e) => !props.isLock ? props.selectObject(props.object, e) : e.preventDefault()}>
            <p>{props.object.content}</p>
        </div>
    );
}