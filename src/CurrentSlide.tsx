import React from 'react';
import * as type from './core/types';

interface Slide {
    currentSlide: type.Slide | null
}

export default function CurrentSlide(props: Slide) {
    if (props.currentSlide !== null) {
        return (
            <div className="current-slide">
                <li className='slide'>
                    {/*{props.currentSlide.objects}*/}
                    {/*{props.currentSlide.background}*/}
                    slide's parts
                </li>
            </div>
        );
    } else {
        return (
            <div className="current-slide">
                <span>no current slide</span>
            </div>
        );
    }
}