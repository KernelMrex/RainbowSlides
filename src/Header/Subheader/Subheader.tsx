import React from 'react'
import Counter from './Counter/Counter';
import './Subheader.css'
import {connect} from "react-redux";
import {RootState} from "../../store/store";
import { Slide } from '../../core/types';
import Tool from './Tool/Tool';
import {addSlide, deleteSlide} from "../../store/presentation/actions";

const mapState = (state: RootState) => ({ selectedSlideId: state.presentation.selection.slide, slides: state.presentation.slides })
const mapDispatch = { addSlide: addSlide, deleteSlide: deleteSlide }

type DispatchProps = typeof mapDispatch
type StateProps = ReturnType<typeof mapState>
type SubheaderProps = StateProps & DispatchProps

function Subheader(props: SubheaderProps)
{
    const currentSlide: Slide | undefined = props.slides.find((slide) => slide.id === props.selectedSlideId)
    const currentIndex: number = currentSlide === undefined ? 0 : props.slides.indexOf(currentSlide) + 1
    return (
        <div className={ 'subheader' }>
            <div className={ 'subheader__column subheader__column_content_center' }>
                <Counter current={ currentIndex } max={ props.slides.length }/>
                <Tool content={'plus'} onClick={props.addSlide}/>
                <Tool content={'minus'} onClick={props.deleteSlide}/>
            </div>
        </div>
    )
}

export default connect(mapState, mapDispatch)(Subheader)