import React from 'react';
import * as type from '../core/types';
import style from './Presentation.module.css';
import CurrentSlide from './CurrentSlide/CurrentSlide';
import SlideList from './SlideList/SlideList'
import { connect } from 'react-redux';
import {RootState} from "../store/store";

const mapState = (state: RootState) => ({ presentation: state.presentation })

type StateProps = ReturnType<typeof mapState>
type PresentationProps = StateProps

function Presentation(props: PresentationProps)
{
    let currentSlide: type.Slide | null;
    if (props.presentation.selection.slide !== null)
    {
        currentSlide = props.presentation.slides.filter(slide => slide.id === props.presentation.selection.slide)[0];
    } else
    {
        currentSlide = null
    }

    return (
        <div className={style.container}>
            <SlideList/>
            <CurrentSlide/>
        </div>
    )
}

export default connect(mapState)(Presentation)