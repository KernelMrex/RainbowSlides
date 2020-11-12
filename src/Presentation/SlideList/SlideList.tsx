import React, {useState} from 'react';
import * as type from '../../core/types';
import style from './SlideList.module.css';
import MiniSlide from './MiniSlide';

interface Presentation
{
    presentation: type.Presentation
}

export default function SlideList(props: Presentation)
{
    let slideList;
    if (props.presentation.slides.length !== 0)
    {
        slideList = props.presentation.slides.map((slide) => (
            <div style={{background: (props.presentation.selection.slide === slide.id) ? '#00000024' : 'transparent'}}>
                <MiniSlide key={slide.id} slide={slide}/>
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