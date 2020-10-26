import React from 'react';
import * as type from '../../core/types';
import style from './CurrentSlide.module.css'

interface Slide {
    currentSlide: type.Slide | null
}

export default function CurrentSlide(props: Slide) {
    return (
        <div className={style.wrapper}>
            <div className={style.content}>
            </div>
        </div>
    )
}