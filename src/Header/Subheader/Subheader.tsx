import React from 'react'
import Counter from './Counter/Counter';
import './Subheader.css'
import {connect} from "react-redux";

import {RootState} from "../../store/store";
import { Slide } from '../../core/types';
const mapState = (state: RootState) => ({ selectedSlideId: state.presentation.selection.slide, slides: state.presentation.slides })

type StateProps = ReturnType<typeof mapState>
type SubheaderProps = StateProps

function Subheader(props: SubheaderProps)
{
    const currentSlide: Slide | undefined = props.slides.find((slide) => slide.id === props.selectedSlideId)
    const currentIndex: number = currentSlide === undefined ? 0 : props.slides.indexOf(currentSlide) + 1
    console.log(currentIndex)
    return (
        <div className={ 'subheader' }>
            <div className={ 'subheader__column subheader__column_content_center' }>
                <Counter current={ currentIndex } max={ props.slides.length }/>
            </div>
        </div>
    )
}

export default connect(mapState)(Subheader)