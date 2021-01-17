import React  from 'react';
import * as type from '../../core/types';
import style from './CurrentSlide.module.css'
import SlideObject from './SlideObject/SlideObject'
import {connect} from "react-redux";
import {RootState} from "../../store/store";
import {changeOrderOfSlide, unselectObject} from "../../store/presentation/actions";

const mapState = (state: RootState) => ({ slideId: state.presentation.selection.slide, slides: state.presentation.slides, selectedObjects: state.presentation.selection.objects })
const mapDispatch = { changeOrderOfSlide: changeOrderOfSlide, unselectObject: unselectObject }
type DispatchProps = typeof mapDispatch
type StateProps = ReturnType<typeof mapState>
type CurrentSlideProps = StateProps & DispatchProps

function CurrentSlide(props: CurrentSlideProps)
{
    const currentSlide: type.Slide | undefined = props.slides.find((slide) => slide.id === props.slideId)
    let mapList;
    const selectedObjects: Array<string> | [] = props.selectedObjects;
    let background = '#ffffff';
    if (currentSlide && currentSlide !== undefined && currentSlide.objects !== [])
    {
        mapList = currentSlide.objects.map((slideObjects) =>
            <SlideObject
                key={slideObjects.id}
                object={slideObjects}
                coef={1}
                isSelected={selectedObjects.find((objectID) => objectID === slideObjects.id) !== undefined ? true : false}
                isLock={false}/>
        );

        background = defineBackground(currentSlide.background);
    }

    return (
        <div className={style.wrapper} onClick={(event) => {if (event !== null && (event.target as Element).tagName === 'DIV') props.unselectObject()}}>
            <div className={style.content} style={{background: background, backgroundSize: 'cover'}}>
                {currentSlide && (currentSlide !== undefined) && (currentSlide.objects !== []) &&
                mapList
                }
            </div>
        </div>
    )
}

function isColor(background: type.Color | type.Picture): background is type.Color {
    return (background as type.Color).hex !== undefined;
}

function defineBackground(unknownBackground: type.Picture | type.Color): string
{
    let background: string;
    background = isColor(unknownBackground) ? unknownBackground.hex : 'url(\'' + unknownBackground.source + '\')';

    return background;
}

export default connect(mapState, mapDispatch)(CurrentSlide)