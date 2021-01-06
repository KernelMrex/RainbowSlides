import React from 'react';
import * as type from '../../../core/types';
import Rectangle from './Objects/Rectangle'
import Circle from './Objects/Circle';
import Triangle from './Objects/Triangle';
import Image from './Objects/Image';
import Text from './Objects/Text';

interface SlideObjects
{
    key: string
    object: type.SlideObject
    coef: number
    presentation: type.Presentation
    changeSelectedPresentation: Function
    changeSize: Function
    changePosition: (obj: type.SlideObject, pos: type.Anchor) => void
    changeText: (content: string) => void
    isSelected: boolean
    isLock: boolean
}

export type PointerType = "none" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "auto" | "all" | "fill" | "painted" | "stroke" | "visible" | "visibleFill" | "visiblePainted" | "visibleStroke" | undefined

export default function SlideObject(props: SlideObjects)
{
    const object = props.object;
    let render;
    switch (object.type)
    {
        case 'rectangle':
            render = <Rectangle object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation} isLock={props.isLock} changePosition={props.changePosition} changeSize={props.changeSize}/>
            break;

        case 'circle':
            render = <Circle object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation} isLock={props.isLock} changePosition={props.changePosition} changeSize={props.changeSize}/>
            break;

        case 'triangle':
            render = <Triangle object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation} isLock={props.isLock} changePosition={props.changePosition} changeSize={props.changeSize}/>
            break;

        case 'image':
            render = <Image object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation} isLock={props.isLock} changePosition={props.changePosition} changeSize={props.changeSize}/>
            break;

        case 'text':
            render = <Text object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation} changeText={props.changeText} isLock={props.isLock} changePosition={props.changePosition} changeSize={props.changeSize}/>
            break;

        default:
            render = <></>
    }
    return (
        render
    )
}