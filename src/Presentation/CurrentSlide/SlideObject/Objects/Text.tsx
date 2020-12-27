import React, {useState, useRef} from 'react';
import * as type from '../../../../core/types';
import style from './Objects.module.css';
import {useDragAndDropElement} from '../../../../CustomHooks/DragAndDropElement';
import HOCDots from "./Resizers/HOCDots";

interface SlideObjects
{
    object: type.TextBlock
    coef: number
    selectObject: Function
    changeSize: Function
    changePosition: (obj: type.SlideObject, pos: type.Anchor) => void
    changeText: (content: string) => void
    isSelected: boolean
    isLock: boolean
}

export default function Text(props: SlideObjects)
{
    const [pos, setNewPos] = useState(props.object.position);
    const ref = useRef(null);
    const [physicalParams, setNewPhysicalParams] = useState({height: props.object.height, width: props.object.width});
    const [textStyle, toggleTextStyle] = useState(style.notSelectedText);
    const [textContent, changeTextContent] = useState(props.object.content);

    useDragAndDropElement(ref, props.changePosition, setNewPos, props.object, pos, props.isLock);

    if ((props.isLock && pos !== props.object.position))
    {
        setNewPos(props.object.position)
    }

    if ((props.isLock && textContent !== props.object.content))
    {
        changeTextContent(props.object.content)
    }

    if (props.isLock && (physicalParams.width !== props.object.width || physicalParams.height !== props.object.height))
    {
        setNewPhysicalParams({height: props.object.height, width: props.object.width})
    }

    const width: number = physicalParams.width / props.coef;
    const height: number = physicalParams.height / props.coef;
    const x: number = props.isSelected ? pos.x - 3 / props.coef : pos.x / props.coef;
    const y: number = props.isSelected ? pos.y - 3 / props.coef : pos.y / props.coef;

    const objectStyle = {
        width: width,
        height: height,
        left: x + 'px',
        top: y + 'px',
        color: props.object.color.hex,
        fontFamily: props.object.font.family,
        fontSize: (props.object.font.size / props.coef).toFixed() + 'px',
        fontStyle: props.object.font.style,
        background: props.object.background.hex,
        fontWeight: props.object.font.weight,
        border: props.isSelected ? '3px solid transparent' : 0,
        outline: props.isSelected ? '2px dashed #d3cde4' : 'none',
    };
    return (
        <div className={style.wrapper} style={{width: width, height: height, left: x + 'px', top: y + 'px',}}>
            {!props.isLock && props.isSelected &&
            <HOCDots object={props.object} pos={pos}
                     physicalParams={{width: physicalParams.width + 13, height: physicalParams.height}}
                     callbackSize={setNewPhysicalParams}
                     callbackPosition={setNewPos}
                     changeSize={props.changeSize}/>
            }

            <textarea onClick={(e) => !props.isLock ? props.selectObject(props.object) : e.preventDefault()}
                      style={objectStyle}
                      ref={ref}
                      className={textStyle}
                      onDoubleClick={(e) =>
                      {
                          // @ts-ignore
                          e.target.focus();
                      }}
                      onChange={(e) =>
                      {
                          changeTextContent(e.target.value)
                      }}
                      onBlur={(e) =>
                      {
                          props.changeText(textContent)
                          toggleTextStyle(style.notSelectedText)
                      }}
                      value={textContent}/>
        </div>
    );
}