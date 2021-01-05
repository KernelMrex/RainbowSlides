import React, {useRef, useState} from 'react';
import * as type from '../../core/types';
import style from './SlideList.module.css';
import MiniSlide from './MiniSlide';

interface Presentation
{
    presentation: type.Presentation
    changeSlide: Function
    changeSize: Function
    changePosition: (obj: type.SlideObject, pos: type.Anchor) => void
    changeText: (content: string) => void
    changeSlidePosition: (estimateSlideId: string, currentSlideId: string, position: 'bottom' | 'top') => void
    changeSelectedPresentation: Function
}

export type HorizontalLineSlides = {
    id: string,
    position: 'bottom' | 'top' | ''
}

const defaultValue: HorizontalLineSlides = {id: '', position: ''}

export default function SlideList(props: Presentation)
{
    let slideList;
    if (props.presentation.slides.length !== 0)
    {
        slideList = props.presentation.slides.map((slide) => (
            <div key={slide.id}
                 style={{background: (props.presentation.selection.slide === slide.id) ? '#00000024' : 'transparent'}}
                 className={style.relativeBlock}
                 onClick={(e) => props.presentation.selection.slide !== slide.id ? props.changeSlide(slide) : ''}>
                <MiniSlide
                    slide={slide}
                    presentation={props.presentation}
                    changeSelectedPresentation={props.changeSelectedPresentation}
                    changeSize={props.changeSize}
                    changeText={props.changeText}
                    changePosition={props.changePosition}
                    changeSlidePosition={props.changeSlidePosition}/>
            </div>
        ));
    }
    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                {(props.presentation.slides.length === 0)
                    ? <div className={style.error_text}>There are no slides</div>
                    : slideList
                }
            </div>
        </div>
    )
}