import React from 'react';
import * as type from '../../core/types';
import style from './MiniSlide.module.css'
import SlideObject from '../CurrentSlide/SlideObject/SlideObject'

interface Slide
{
    slide: type.Slide,
    presentation: type.Presentation
    changeSelectedPresentation: Function
}

export default function MiniSlide(props: Slide)
{
    let mapList;
    let background = '#ffffff';
    if (props.slide !== null && props.slide.objects !== [])
    {
        mapList = props.slide.objects.map((slideObjects) =>
            <SlideObject
                key={slideObjects.id}
                object={slideObjects}
                coef={5.6}
                presentation={props.presentation}
                changeSelectedPresentation={props.changeSelectedPresentation}
                isSelected={false}/>
        );

        background = defineBackground(props.slide.background);
    }
    return (
        <div className={style.wrapper} style={{background: background}}>
            {(props.slide !== null) && (props.slide.objects !== []) &&
            mapList
            }
        </div>
    )
}

function isColor(pet: type.Color | type.Picture): pet is type.Color
{
    return (pet as type.Color).hex !== undefined;
}

function defineBackground(unknownBackground: type.Picture | type.Color): string
{
    let background: string;
    background = isColor(unknownBackground) ? unknownBackground.hex : unknownBackground.source;

    return background;
}