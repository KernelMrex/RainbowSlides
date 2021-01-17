import React from 'react';
import * as type from './core/types';
import style from './App.module.css'
import Popup from './Popup/Popup'
import {bindKeys} from "./common/bindKeys";
import Header from "./Header/Header";
import Subheader from "./Header/Subheader/Subheader";
import SlideList from "./SlideList/SlideList";
import CurrentSlide from './CurrentSlide/CurrentSlide';

export default function App()
{
    return (
        <div>
            <Popup/>
            <div className={style.appWrapper}>
                <Header/>
                <Subheader/>
            </div>
            <div className={style.app}>
                <SlideList/>
                <CurrentSlide/>
            </div>
        </div>
    )
};