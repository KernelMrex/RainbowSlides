import React from 'react';
import * as type from '../../core/types';
import style from './SlideList.module.css';
import MiniSlide from './MiniSlide';
import { selectSlide } from '../../core/selection/selection'

interface Presentation
{
    presentation: type.Presentation
    changeSlide: Function
    changePosition: (obj: type.SlideObject, pos: type.Anchor) => void
    changeSelectedPresentation: Function
}

export default function SlideList(props: Presentation)
{
    let slideList;
    if (props.presentation.slides.length !== 0)
    {
        slideList = props.presentation.slides.map((slide) => (
            <div key={slide.id}
                 style={{background: (props.presentation.selection.slide === slide.id) ? '#00000024' : 'transparent'}}
                 onClick={(e) => props.presentation.selection.slide !== slide.id ? props.changeSlide(slide) : ''}>
                <MiniSlide
                    slide={slide}
                    presentation={props.presentation}
                    changeSelectedPresentation={props.changeSelectedPresentation}
                    changePosition={props.changePosition}/>
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