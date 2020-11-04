import React from 'react';
import * as type from '../core/types';
import style from './Presentation.module.css';
import CurrentSlide from './CurrentSlide/CurrentSlide';
import SlideList from './SlideList/SlideList'

interface Presentation
{
    presentation: type.Presentation
}

export default function Presentation(props: Presentation)
{
    let currentSlide: type.Slide | null;
    if (props.presentation.selection.slide !== null)
    {
        currentSlide = props.presentation.slides.filter(slide => slide.id === props.presentation.selection.slide)[0];
    } else
    {
        currentSlide = null
    }

    return (
        <div className={style.container}>
            <SlideList presentation={props.presentation}/>
            <CurrentSlide currentSlide={currentSlide}/>
        </div>
    )
}