import React from 'react';
import * as type from '../core/types';
import '../style/miniSlide.css'

interface Slide
{
    key: number,
    slide: type.Slide | null
}

export default function MiniSlide(props: Slide)
{
    return (
        <div className="b-mini-slide__wrapper">
            <span className="b-mini-slide__element">key: {props.key}</span>
        </div>
    )
}