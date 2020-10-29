import React from 'react';
import * as type from '../../../core/types';
import Rectangle from './Rectangle/Rectangle'

interface SlideObjects
{
    key: string,
    object: type.SlideObject
}

export default function SlideObject(props: SlideObjects)
{
    let object;
    switch (props.object.type) {
        case 'rectangle': {
            object = <Rectangle object={props.object}/>
            break
        }
        case 'circle': {
            object = <Rectangle object={props.object}/>
            break
        }
        default: {
            object = <></>
        }
    }
    return (
        object
    )
}