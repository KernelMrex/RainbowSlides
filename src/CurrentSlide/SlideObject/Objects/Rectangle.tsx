import React, {useRef, useState} from 'react';
import * as type from '../../../core/types';
import style from './Objects.module.css';
import {useDragAndDropElement} from '../../../CustomHooks/DragAndDropElement';
import HOCDots from './Resizers/HOCDots';
import {PointerType} from "../SlideObject";
import {connect} from "react-redux";
import {selectObject, changeSize, changePosition} from '../../../store/presentation/actions';

const mapDispatch = { selectObject: selectObject, changeSize: changeSize, changePosition: changePosition }

type DispatchProps = typeof mapDispatch
type RectangleProps = DispatchProps

interface SlideObjects
{
    object: type.RectangleBlock
    coef: number
    isSelected: boolean
    isLock: boolean
}

function Rectangle(props: SlideObjects & RectangleProps)
{
    const [pos, setNewPos] = useState(props.object.position);
    const [physicalParams, setNewPhysicalParams] = useState({height: props.object.height, width: props.object.width});
    const ref = useRef(null);
    const [isDragAndDrop, setStatusDragAndDrop] = useState(false)
    const [isResize, setStatusResize] = useState(false)

    if ((props.isLock || !isDragAndDrop) && !isResize && pos !== props.object.position)
    {
        setNewPos(props.object.position)
    }

    useDragAndDropElement(ref, props.changePosition, setNewPos, props.object, pos, props.isLock, props.selectObject, setStatusDragAndDrop);

    if ((props.isLock || !isResize) && (physicalParams.width !== props.object.width || physicalParams.height !== props.object.height))
    {
        setNewPhysicalParams({height: props.object.height, width: props.object.width})
    }

    const width: number = physicalParams.width / props.coef;
    const height: number = physicalParams.height / props.coef;
    const x: number = props.isSelected ? pos.x - 3 / props.coef : pos.x / props.coef;
    const y: number = props.isSelected ? pos.y - 3 / props.coef : pos.y / props.coef;

    const pointerLock: PointerType = props.isLock ? "none" : undefined

    return (
        <div className={style.wrapper}
             style={{width: width, height: height, top: '' + y + 'px', left: '' + x + 'px', pointerEvents: pointerLock}}>
            {!props.isLock && props.isSelected &&
            <HOCDots object={props.object}
                     pos={pos}
                     physicalParams={physicalParams}
                     callbackSize={setNewPhysicalParams}
                     callbackPosition={setNewPos}
                     changeSize={props.changeSize}
                     setStatusResize={setStatusResize}/>
            }
            <svg
                width={width}
                height={height}
                style={{
                    top: '' + y + 'px',
                    left: '' + x + 'px',
                    border: props.isSelected ? '3px solid transparent' : '',
                    outline: props.isSelected ? '2px dashed #d3cde4' : 'none',
                }}
                onClick={(e) => !props.isLock ? props.selectObject(props.object.id) : e.preventDefault()}>
                <rect
                    ref={ref}
                    width={width}
                    height={height}
                    style={{zIndex: 1}}>
                </rect>
            </svg>
        </div>
    )
}

export default connect(null, mapDispatch)(Rectangle)