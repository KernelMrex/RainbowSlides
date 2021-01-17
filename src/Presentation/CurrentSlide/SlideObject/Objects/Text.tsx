import React, {useState, useRef, DOMElement} from 'react'
import * as type from '../../../../core/types'
import style from './Objects.module.css'
import {useDragAndDropElement} from '../../../../CustomHooks/DragAndDropElement'
import HOCDots from "./Resizers/HOCDots"
import {PointerType} from "../SlideObject"
import {connect} from "react-redux"
import {changePosition, changeSize, changeText, selectObject} from '../../../../store/presentation/actions'

const mapDispatch = {
    selectObject: selectObject,
    changeSize: changeSize,
    changePosition: changePosition,
    changeText: changeText
}

type DispatchProps = typeof mapDispatch
type TextProps = DispatchProps

interface SlideObjects
{
    object: type.TextBlock
    coef: number
    isSelected: boolean
    isLock: boolean
}

function Text(props: SlideObjects & TextProps)
{
    const [pos, setNewPos] = useState(props.object.position)
    const ref = useRef(null)
    const [physicalParams, setNewPhysicalParams] = useState({height: props.object.height, width: props.object.width})
    const [textStyle, toggleTextStyle] = useState(style.notSelectedText)

    useDragAndDropElement(ref, props.changePosition, setNewPos, props.object, pos, props.isLock, props.selectObject)

    if ((props.isLock && pos !== props.object.position))
    {
        setNewPos(props.object.position)
    }

    if (props.isLock && (physicalParams.width !== props.object.width || physicalParams.height !== props.object.height))
    {
        setNewPhysicalParams({height: props.object.height, width: props.object.width})
    }

    const width: number = physicalParams.width / props.coef
    const height: number = physicalParams.height / props.coef
    const x: number = props.isSelected ? pos.x - 3 / props.coef : pos.x / props.coef
    const y: number = props.isSelected ? pos.y - 3 / props.coef : pos.y / props.coef

    const pointerLock: PointerType = props.isLock ? "none" : undefined

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
    }
    return (
        <div className={style.wrapper}
             style={{width: width, height: height, left: x + 'px', top: y + 'px', pointerEvents: pointerLock}}>
            {!props.isLock && props.isSelected &&
            <HOCDots
                object={props.object}
                pos={pos}
                physicalParams={{width: physicalParams.width + 13, height: physicalParams.height}}
                callbackSize={setNewPhysicalParams}
                callbackPosition={setNewPos}
                changeSize={props.changeSize}/>
            }
            <textarea
                onClick={(e) => !props.isLock ? props.selectObject(props.object.id) : e.preventDefault()}
                style={objectStyle}
                ref={ref}
                className={textStyle}
                onDoubleClick={(e) => (e.target as HTMLInputElement).focus()}
                onChange={(e) => props.changeText(e.target.value)}
                onBlur={(e) => toggleTextStyle(style.notSelectedText)}
                value={props.object.content}/>
        </div>
    )
}

export default connect(null, mapDispatch)(Text)