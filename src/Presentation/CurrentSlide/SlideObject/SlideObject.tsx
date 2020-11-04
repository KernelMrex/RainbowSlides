import React from 'react';
import * as type from '../../../core/types';
import Rectangle from './Objects/Rectangle'
import style from './SlideObject.module.css';
import Circle from './Objects/Circle';
import Triangle from './Objects/Triangle';
import Image from './Objects/Image';

interface SlideObjects
{
    object: type.SlideObject
}

export default function SlideObject(props: SlideObjects)
{
    let object = props.object;
    let render;
    switch (object.type) {
        case 'rectangle':
            render = <Rectangle class={style.wrapper} object={object}/>
            break;

        case 'circle':
            render = <Circle class={style.wrapper} object={object}/>
            break;

        case 'triangle':
            render = <Triangle class={style.wrapper} object={object}/>
            break;

        case 'image':
            render = <Image class={style.wrapper} object={object}/>
            break;

        default:
            render = <></>
    }
    return (
        render
    )
}