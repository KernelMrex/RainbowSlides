import React from 'react';
import * as type from './core/types';
import style from './App.module.css'
import Footer from './Footer/Footer'
import TopBar from './TopBar/TopBar'
import Presentation from './Presentation/Presentation'
import Popup from './Popup/Popup'
import { useModal, useNewPresentation } from './CustomHooks/CustomHooks';
import {bindKeys} from "./common/bindKeys";
import {connect} from "react-redux";
import Header from "./Header/Header";
import Subheader from "./Header/Subheader/Subheader";
import SlideList from "./Presentation/SlideList/SlideList";
import CurrentSlide from "./Presentation/CurrentSlide/CurrentSlide";

interface Presentation
{
    presentation: type.Presentation
}

export default function App()
{
    const {
        downloadPresentation,
    } = useNewPresentation();

    const {popupState, changeVisabilityPopup} = useModal();
        return (
            // <div className={style.appWrapper}>
            //     {/*<Popup presentation={presentation} hidePopup={changeVisabilityPopup} setNewPresentation={downloadPresentation} popupState={popupState}/>*/}
            //     <div className={style.app}>
            //         {/*modal={changeVisabilityPopup}*/}
            //     </div>
            // </div>

    <div>
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