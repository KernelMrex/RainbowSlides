import React from 'react';
import * as type from './core/types';
import './style/slideList.css'

interface SlideList {
    slideList: Array<type.Slide>
}

export default function SlideList(props: SlideList) {
    return (
        <div className="b-slides__wrapper">
            {props.slideList}
        </div>
    )
}