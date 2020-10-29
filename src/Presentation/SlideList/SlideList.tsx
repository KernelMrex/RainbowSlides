import React from 'react';
import * as type from '../../core/types';
import style from './SlideList.module.css';
import MiniSlide from './MiniSlide';

interface SlideList
{
    slideList: Array<type.Slide>
}

export default function SlideList(props: SlideList)
{
    let slideList;
    if (props.slideList.length !== 0)
    {
        slideList = props.slideList.map((slide) => (
            <MiniSlide key={slide.id} slide={slide}/>
        ));
    }
    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                {(props.slideList.length === 0)
                    ? <div className={style.error_text}>There are no slides</div>
                    : slideList
                }
            </div>
        </div>
    )
}