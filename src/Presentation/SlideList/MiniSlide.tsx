import React from 'react';
import * as type from '../../core/types';
import style from './MiniSlide.module.css'

interface Slide
{
    key: string,
    slide: type.Slide
}

export default function MiniSlide(props: Slide)
{
    return (
        <div className={style.wrapper} onClick={(e) => console.log(props.key)}>
            <span className={style.element}></span>
        </div>
    )
}