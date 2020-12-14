import React from 'react';
import * as type from '../core/types';
import style from './Presentation.module.css';
import CurrentSlide from './CurrentSlide/CurrentSlide';
import SlideList from './SlideList/SlideList'

interface Presentation
{
    presentation: type.Presentation
    changeSelectedPresentation: Function
    removeAllSelectedObjects: Function
    changeSlide: Function
    changePosition: (obj: type.SlideObject, pos: type.Anchor) => void
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
            <SlideList
                presentation={props.presentation}
                changeSelectedPresentation={props.changeSelectedPresentation}
                changeSlide={props.changeSlide}
                changePosition={props.changePosition}/>
            <CurrentSlide
                currentSlide={currentSlide}
                presentation={props.presentation}
                changeSelectedPresentation={props.changeSelectedPresentation}
                removeAllSelectedObjects={props.removeAllSelectedObjects}
                changePosition={props.changePosition}/>
        </div>
    )
}