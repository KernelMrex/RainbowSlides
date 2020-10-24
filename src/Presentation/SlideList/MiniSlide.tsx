import React from 'react';
import * as type from '../../core/types';
import style from './miniSlide.module.css'

interface Slide
{
    key: number,
    slide: type.Slide
}

export default function MiniSlide(props: Slide)
{
    return (
        <div className={style.wrapper}>
            <span className={style.element}>{props.key}.</span>
        </div>
    )
}