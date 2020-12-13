import React, { useRef, useState } from 'react';
import * as type from '../../../core/types';
import Rectangle from './Objects/Rectangle'
import Circle from './Objects/Circle';
import Triangle from './Objects/Triangle';
import Image from './Objects/Image';
import Text from './Objects/Text';
import { useDragAndDrop } from '../../../CustomHooks/DragAndDrop';

interface SlideObjects
{
    key: string
    object: type.SlideObject
    coef: number
    presentation: type.Presentation
    changeSelectedPresentation: Function
    changePosition: Function
    isSelected: boolean
    isLock: boolean
}

export default function SlideObject(props: SlideObjects)
{
    const object = props.object;
    let render;
    const newProps = {}
    switch (object.type)
    {
        case 'rectangle':
            render = <Rectangle object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation} isLock={props.isLock} changePosition={props.changePosition}/>
            break;

        case 'circle':
            render = <Circle object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation} isLock={props.isLock} changePosition={props.changePosition}/>
            break;

        case 'triangle':
            render = <Triangle object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation} isLock={props.isLock} changePosition={props.changePosition}/>
            break;

        case 'image':
            render = <Image object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation} isLock={props.isLock} changePosition={props.changePosition}/>
            break;

        case 'text':
            render = <Text object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation} isLock={props.isLock} changePosition={props.changePosition}/>
            break;

        default:
            render = <></>
    }
    return (
        render
    )
}