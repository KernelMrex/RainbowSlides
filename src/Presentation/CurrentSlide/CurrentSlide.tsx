import React from 'react';
import * as type from '../../core/types';
import style from './CurrentSlide.module.css'
import SlideObject from './SlideObject/SlideObject'

interface Slide
{
    currentSlide: type.Slide | null
}

export default function CurrentSlide(props: Slide)
{
    let mapList;
    let background = '#ffffff';
    if (props.currentSlide !== null && props.currentSlide.objects !== [])
    {
        mapList = props.currentSlide.objects.map((slideObjects) =>
            <SlideObject key={slideObjects.id} object={slideObjects} coef={1}/>
        );

        background = defineBackground(props.currentSlide.background);
    }

    return (
        <div className={style.wrapper}>
            <div className={style.content} style={{background: background}}>
                {(props.currentSlide !== null) && (props.currentSlide.objects !== []) &&
                mapList
                }
            </div>
        </div>
    )
}

function isColor(pet: type.Color | type.Picture): pet is type.Color {
    return (pet as type.Color).hex !== undefined;
}

function defineBackground(unknownBackground: type.Picture | type.Color): string
{
    let background: string;
    background = isColor(unknownBackground) ? unknownBackground.hex : unknownBackground.source;

    return background;
}