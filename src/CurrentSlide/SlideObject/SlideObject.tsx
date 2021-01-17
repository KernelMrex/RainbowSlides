import React from 'react';
import * as type from '../../core/types';
import Rectangle from './Objects/Rectangle'
import Circle from './Objects/Circle';
import Triangle from './Objects/Triangle';
import Image from './Objects/Image';
import Text from './Objects/Text';

interface SlideObjects
{
    object: type.SlideObject
    coef: number
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
            render = <Rectangle object={object} coef={props.coef} isSelected={props.isSelected} isLock={props.isLock}/>
            break;

        case 'circle':
            render = <Circle object={object} coef={props.coef} isSelected={props.isSelected} isLock={props.isLock}/>
            break;

        case 'triangle':
            render = <Triangle object={object} coef={props.coef} isSelected={props.isSelected} isLock={props.isLock}/>
            break;

        case 'image':
            render = <Image object={object} coef={props.coef} isSelected={props.isSelected} isLock={props.isLock}/>
            break;

        case 'text':
            render = <Text object={object} coef={props.coef} isSelected={props.isSelected} isLock={props.isLock}/>
            break;

        default:
            render = <></>
    }
    return (
        render
    )
}