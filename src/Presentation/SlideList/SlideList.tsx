import React, {useRef, useState} from 'react';
import * as type from '../../core/types';
import style from './SlideList.module.css';
import MiniSlide from './MiniSlide';
import {RootState, store} from "../../store/store";
import {connect} from "react-redux";
import {changeOrderOfSlide, unselectObject, selectSlide} from "../../store/presentation/actions";

export type HorizontalLineSlides = {
    id: string,
    position: 'bottom' | 'top' | ''
}

const mapState = (state: RootState) => ({ slideId: state.presentation.selection.slide, slides: state.presentation.slides, selectedSlide: state.presentation.selection.slide })
const mapDispatch = { selectSlide: selectSlide }
type DispatchProps = typeof mapDispatch
type StateProps = ReturnType<typeof mapState>
type SlideListProps = StateProps & DispatchProps

const defaultValue: HorizontalLineSlides = {id: '', position: ''}

function SlideList(props: SlideListProps)
{
    let slideList;
    if (props.slides.length !== 0)
    {
        slideList = props.slides.map((slide) => (
            <div key={slide.id}
                 style={{background: (props.selectedSlide === slide.id) ? '#00000024' : 'transparent'}}
                 className={style.relativeBlock}
                 onClick={(e) => {if (props.selectedSlide !== slide.id) props.selectSlide(slide.id)}}>
                <MiniSlide
                    slide={slide}/>
            </div>
        ));
    }
    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                {(props.slides.length === 0)
                    ? <div className={style.error_text}>There are no slides</div>
                    : slideList
                }
            </div>
        </div>
    )
}

export default connect(mapState, mapDispatch)(SlideList)