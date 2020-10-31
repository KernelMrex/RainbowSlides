import React from 'react';
import * as type from '../../../../core/types';

interface SlideObjects
{
    class: string
    object: type.ImageBlock
}

export default function Image(props: SlideObjects)
{
    return (
        <div className={props.class}>
            <img src={props.object.source}/>
        </div>
    );
}