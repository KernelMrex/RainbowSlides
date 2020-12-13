import React  from 'react';
import * as type from '../../core/types';
import style from './CurrentSlide.module.css'
import SlideObject from './SlideObject/SlideObject'


interface Slide
{
    currentSlide: type.Slide | null
    presentation: type.Presentation
    changeSelectedPresentation: Function
    removeAllSelectedObjects: Function
    changePosition: Function
}

export default function CurrentSlide(props: Slide)
{
    let mapList;
    const selectedObjects: Array<string> | [] = props.presentation.selection.objects;
    let background = '#ffffff';
    if (props.currentSlide && props.currentSlide.objects !== [])
    {
        mapList = props.currentSlide.objects.map((slideObjects) =>
            <SlideObject
                key={slideObjects.id}
                object={slideObjects}
                coef={1}
                presentation={props.presentation}
                changeSelectedPresentation={props.changeSelectedPresentation}
                changePosition={props.changePosition}
                isSelected={selectedObjects.find((objectID) => objectID === slideObjects.id) !== undefined ? true : false}
                isLock={false}/>
        );

        background = defineBackground(props.currentSlide.background);
    }

    return (
        <div className={style.wrapper} onClick={(e) => props.removeAllSelectedObjects(e)}>
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