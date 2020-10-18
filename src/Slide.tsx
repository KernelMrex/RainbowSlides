import React from 'react';
import * as type from './core/types';

interface Slide {
    slide: type.Slide
}

export default function SlideList(props: Slide) {

    return (
        <li className='mini-slide'>
            {props.slide.objects}
            {props.slide.background}
        </li>
    );
}