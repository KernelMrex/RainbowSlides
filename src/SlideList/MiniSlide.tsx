import React, {RefObject, useRef, useState} from 'react';
import * as type from '../core/types';
import style from './MiniSlide.module.css'
import SlideObject from '../CurrentSlide/SlideObject/SlideObject'
import {useDragAndDropSlides} from '../CustomHooks/DragAndDropSlides';
import {HorizontalLineSlides} from './SlideList';
import { connect } from 'react-redux';
import {RootState} from "../store/store";
import { changeOrderOfSlide } from '../store/presentation/actions';

interface Slide
{
    slide: type.Slide,
}

const defaultValue: HorizontalLineSlides = {id: '', position: ''}

const mapState = (state: RootState) => ({ presentation: state.presentation })
const mapDispatch = { changeOrderOfSlide: changeOrderOfSlide }

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch
type MiniSlideProps = StateProps & DispatchProps

function MiniSlide(props: Slide & MiniSlideProps)
{
    const slides: Array<string> = getAllIdSlides(props.presentation.slides)
    const ref = useRef(null)
    const [estimatedNextSlide, changeEstimatedNextSlide] = useState(defaultValue);

    useDragAndDropSlides(ref, props.slide.id, changeEstimatedNextSlide, props.changeOrderOfSlide, props.presentation)

    let mapList: Array<JSX.Element> = [];
    let background: string = '#ffffff';
    if (props.slide !== null && props.slide.objects !== [])
    {
        mapList = props.slide.objects.map((slideObjects) =>
            <SlideObject
                key={slideObjects.id}
                object={slideObjects}
                coef={5.6}
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
                 style={{background: background, backgroundSize: 'cover'}}>
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
    background = isColor(unknownBackground) ? unknownBackground.hex : 'url(\'' + unknownBackground.source + '\')';

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

export default connect(mapState, mapDispatch)(MiniSlide)