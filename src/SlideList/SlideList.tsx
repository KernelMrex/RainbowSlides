import React from 'react';
import * as type from '../core/types';
import '../style/slideList.css'
import MiniSlide from './MiniSlide'

interface SlideList
{
    slideList: Array<type.Slide>
}

export default function SlideList(props: SlideList)
{
    return (
        <div className="b-slides__wrapper">
            <div className="b-slides__content">
                {/*{props.slideList.map((slide, index) => (*/}
                    <MiniSlide key={12} slide={null} />
                {/*))}*/}
            </div>
        </div>
    )
}