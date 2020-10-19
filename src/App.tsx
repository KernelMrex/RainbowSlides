import React from 'react';
import * as type from './core/types';
import './style/app.css'
import Footer from './Footer/Footer'
import TopBar from './TopBar/TopBar'
import CurrentSlide from './CurrentSlide/CurrentSlide'
import SlideList from './SlideList/SlideList'

interface Presentation
{
    presentation: type.Presentation
}

export default function App(props: Presentation)
{
    let currentSlide: type.Slide | null;
    if (props.presentation.selection.slide !== null)
    {
        currentSlide = props.presentation.slides.filter(slide => slide.id == props.presentation.selection.slide)[0];
    } else
    {
        currentSlide = null
    }

    return (
        <div className="b-app">
            <TopBar name={props.presentation.name}/>
            <div className="b-app__container">
                <SlideList slideList={props.presentation.slides}/>
                <CurrentSlide currentSlide={currentSlide}/>
            </div>
            <Footer></Footer>
        </div>
    )
};
