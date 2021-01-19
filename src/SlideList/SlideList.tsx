import React from 'react'
import { connect } from 'react-redux'
import { selectSlide } from '../store/presentation/actions'
import { RootState } from '../store/store'
import MiniSlide from './MiniSlide'
import style from './SlideList.module.css'

export type HorizontalLineSlides = {
    id: string,
    position: 'bottom' | 'top' | ''
}

const mapState = (state: RootState) => ({
    slideId: state.presentation.presentation.selection.slide,
    slides: state.presentation.presentation.slides,
    selectedSlide: state.presentation.presentation.selection.slide,
})
const mapDispatch = { selectSlide: selectSlide }
type DispatchProps = typeof mapDispatch
type StateProps = ReturnType<typeof mapState>
type SlideListProps = StateProps & DispatchProps

function SlideList(props: SlideListProps)
{
    let slideList

    if (props.slides.length !== 0)
    {
        slideList = props.slides.map((slide) => (
            <div key={ slide.id }
                 style={ { background: (props.selectedSlide === slide.id) ? '#00000024' : 'transparent' } }
                 className={ style.relativeBlock }
                 onClick={ () => {
                     if (props.selectedSlide !== slide.id)
                     {
                         props.selectSlide(slide.id)
                     }
                 } }>
                <MiniSlide slide={ slide }/>
            </div>
        ))
    }

    return (
        <div className={ style.wrapper }>
            <div className={ style.content }>
                { (props.slides.length === 0) ? <div className={ style.error_text }>There are no slides</div> : slideList }
            </div>
        </div>
    )
}

export default connect(mapState, mapDispatch)(SlideList)