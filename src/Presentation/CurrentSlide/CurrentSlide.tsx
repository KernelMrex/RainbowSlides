import React from 'react';
import * as type from '../../core/types';
import style from './CurrentSlide.module.css'
import SlideObject from './SlideObject/SlideObject'

interface Slide
{
    currentSlide: type.Slide | null
}

export default function CurrentSlide(props: Slide)
{
    let mapList;
    if (props.currentSlide !== null && props.currentSlide.objects !== [])
    {
        mapList = props.currentSlide.objects.map((slideObjects) =>
            <SlideObject key={slideObjects.id} object={slideObjects}/>
        );
    }
    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                {(props.currentSlide !== null) && (props.currentSlide.objects !== []) &&
                mapList
                }
            </div>
        </div>
    )
}