import React from 'react'
import Slide from '../Slide/Slide'
import './PresentationViewer.css'

export default function PresentationViewer()
{
    const currentSlide = (<Slide id={ 'test-slide' }/>)

    return (
        <div className={ 'presentation-viewer' }>
            <div className={ 'presentation-viewer__slide' }>
                { currentSlide }
            </div>
        </div>
    )
}