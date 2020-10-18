import React from 'react';
import * as type from './core/types';
import './style/app.css'
import Footer from './Footer'
import SlideList from './SlideList'

interface Presentation
{
    presentation: type.Presentation
}

export default function App(props: Presentation) {
    return (
        <div className="b-app">
            <div className="b-app__name_wrapper">
                <div className="b-app__name">
                    <span className="b-app__name_content">{props.presentation.name}</span>
                </div>
            </div>
            <div className="b-app__container">
                <SlideList slideList={props.presentation.slides} />
                <div className="b-app__currentSlide">
                </div>
            </div>
            {/*<Footer></Footer>*/}
        </div>
    )
};
