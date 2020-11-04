import React from 'react';
import * as type from '../../core/types';
import style from './MiniSlide.module.css'

interface Slide
{
    slide: type.Slide,
    //changeSlide: void
}

export default function MiniSlide(props: Slide)
{
    return (
        <div className={style.wrapper} >
            <span className={style.element}></span>
        </div>
    )
}