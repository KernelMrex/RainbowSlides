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
    isSelected: boolean
}

export default function SlideObject(props: SlideObjects)
{
    const object = props.object;
    let render;
    switch (object.type)
    {
        case 'rectangle':
            render = <Rectangle object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation}/>
            break;

        case 'circle':
            render = <Circle object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation}/>
            break;

        case 'triangle':
            render = <Triangle object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation}/>
            break;

        case 'image':
            render = <Image object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation}/>
            break;

        case 'text':
            render = <Text object={object} coef={props.coef} isSelected={props.isSelected} selectObject={props.changeSelectedPresentation}/>
            break;

        default:
            render = <></>
    }
    return (
        render
    )
}