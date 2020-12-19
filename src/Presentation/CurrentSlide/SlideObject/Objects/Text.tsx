import React, {useState, useRef} from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';
import {useDragAndDropElement} from '../../../../CustomHooks/DragAndDropElement';

interface SlideObjects
{
    object: type.TextBlock
    coef: number
    selectObject: Function
    changeSize: Function
    changePosition: (obj: type.SlideObject, pos: type.Anchor) => void
    isSelected: boolean
    isLock: boolean
}

export default function Text(props: SlideObjects)
{
    const [pos, setNewPos] = useState(props.object.position);
    const ref = useRef(null);
    useDragAndDropElement(ref, props.changePosition, setNewPos, props.object, props.isLock);

    if ((props.isLock && pos !== props.object.position))
    {
        setNewPos(props.object.position)
    }

    const width: number = props.object.width / props.coef;
    const height: number = props.object.height / props.coef;
    const x: number = props.isSelected ? pos.x - 3 / props.coef : pos.x / props.coef;
    const y: number = props.isSelected ? pos.y - 3 / props.coef : pos.y / props.coef;

    const objectStyle = {
        width: width,
        maxHeight: height,
        left: x + 'px',
        top: y + 'px',
        color: props.object.color.hex,
        fontFamily: props.object.font.family,
        fontSize: (props.object.font.size / props.coef).toFixed() + 'px',
        fontStyle: props.object.font.style,
        fontWeight: props.object.font.weight,
        border: props.isSelected ? '3px solid transparent' : '',
        outline: props.isSelected ? '2px dashed #d3cde4' : 'none'
    };
    return (
        <div ref={ref} className={style.wrapper} style={objectStyle}
             onClick={(e) => !props.isLock ? props.selectObject(props.object) : e.preventDefault()}>
            <p style={{background: props.object.background.hex, padding: '0 6px'}}>{props.object.content}</p>
        </div>
    );
}