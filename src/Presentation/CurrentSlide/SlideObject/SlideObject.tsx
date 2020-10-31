import React from 'react';
import * as type from '../../../core/types';
import Rectangle from './Objects/Rectangle'
import style from './SlideObject.module.css';
import Circle from './Objects/Circle';
import Triangle from './Objects/Triangle';
import Image from './Objects/Image';

interface SlideObjects
{
    key: string,
    object: type.CircleBlock | type.RectangleBlock | type.TriangleBlock | type.ImageBlock
}

export default function SlideObject(props: SlideObjects)
{
    let object;
    switch (props.object.type) {
        case 'rectangle':
            object = <Rectangle class={style.wrapper} object={props.object}/>
            break;

        case 'circle':
            object = <Circle class={style.wrapper} object={props.object}/>
            break;

        case 'triangle':
            object = <Triangle class={style.wrapper} object={props.object}/>
            break;

        // case 'image':
        //     object = <Image class={style.wrapper} object={props.object}/>
        //     break;

        default:
            object = <></>
    }
    return (
        object
    )
}