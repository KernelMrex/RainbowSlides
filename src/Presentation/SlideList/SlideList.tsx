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
    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                {props.slideList.length === 0 &&
                    <div className={style.error_text}>There are no slides</div>
                }
                {props.slideList.map((slide, index) => (
                    <MiniSlide key={Number(slide.id)} slide={slide} />
                ))}
            </div>
        </div>
    )
}