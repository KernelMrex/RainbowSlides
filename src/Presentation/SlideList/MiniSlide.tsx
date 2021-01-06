import React, {RefObject, useRef, useState} from 'react';
import * as type from '../../core/types';
import style from './MiniSlide.module.css'
import SlideObject from '../CurrentSlide/SlideObject/SlideObject'
import {useDragAndDropSlides} from '../../CustomHooks/DragAndDropSlides';
import {HorizontalLineSlides} from './SlideList';

interface Slide
{
    slide: type.Slide,
    presentation: type.Presentation
    changeSelectedPresentation: Function
    changeSize: Function
    changePosition: (obj: type.SlideObject, pos: type.Anchor) => void
    changeText: (content: string) => void
    changeSlidePosition: (estimateSlideId: string, currentSlideId: string, position: 'bottom' | 'top') => void
}

const defaultValue: HorizontalLineSlides = {id: '', position: ''}

export default function MiniSlide(props: Slide)
{
    const slides: Array<string> = getAllIdSlides(props.presentation.slides)
    const ref = useRef(null)
    const [estimatedNextSlide, changeEstimatedNextSlide] = useState(defaultValue);

    useDragAndDropSlides(ref, props.slide.id, changeEstimatedNextSlide, props.changeSlidePosition)

    let mapList: Array<JSX.Element> = [];
    let background: string = '#ffffff';
    if (props.slide !== null && props.slide.objects !== [])
    {
        mapList = props.slide.objects.map((slideObjects) =>
            <SlideObject
                key={slideObjects.id}
                object={slideObjects}
                coef={5.6}
                presentation={props.presentation}
                changePosition={props.changePosition}
                changeSelectedPresentation={props.changeSelectedPresentation}
                changeSize={props.changeSize}
                changeText={props.changeText}
                isSelected={false}
                isLock={true}/>
        );
        background = defineBackground(props.slide.background);
    }

    const boost: number = estimatedNextSlide.position === 'bottom' ? 1 : 0;

    let positionHr: number = (slides.indexOf(estimatedNextSlide.id) - slides.indexOf(props.slide.id) + boost) * 158

    return (
        <>
            {estimatedNextSlide.id && estimatedNextSlide.id !== '' &&
            <hr className={style.lineDragAndDrop}
                style={{top: positionHr}}/>
            }
            <div ref={ref} id={props.slide.id} className={style.wrapper}
                 style={{background: background}}>
                {(props.slide !== null) && (props.slide.objects !== []) &&
                mapList
                }
            </div>
        </>
    )
}

function isColor(background: type.Color | type.Picture): background is type.Color
{
    return (background as type.Color).hex !== undefined;
}

function defineBackground(unknownBackground: type.Picture | type.Color): string
{
    let background: string;
    background = isColor(unknownBackground) ? unknownBackground.hex : unknownBackground.source;

    return background;
}

function getAllIdSlides(slides: Array<type.Slide>): Array<string>
{
    let slidesId: Array<string> = slides.map((slide) =>
    {
        return slide.id
    })

    return slidesId
}
