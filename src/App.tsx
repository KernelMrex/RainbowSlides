import React from 'react';
import * as type from './core/types';
import style from './App.module.css'
import Footer from './Footer/Footer'
import TopBar from './TopBar/TopBar'
import Presentation from './Presentation/Presentation'
import Popup from './Popup/Popup'
import { useModal, useNewPresentation } from './CustomHooks/CustomHooks';
import {bindKeys} from "./common/bindKeys";

interface Presentation
{
    presentation: type.Presentation
}

export default function App()
{
    const {
        presentation,
        changePresentation,
        downloadPresentation,
        changePosition,
        changeSelectedPresentation,
        removeAllSelectedObjects,
        changeSlide,
        changeSize,
        changeText,
        changeSlidePosition
    } = useNewPresentation();

    const {popupState, changeVisabilityPopup} = useModal();
        return (
            <div className={style.appWrapper}>
                <Popup presentation={presentation} hidePopup={changeVisabilityPopup} setNewPresentation={downloadPresentation} popupState={popupState}/>
                <div className={style.app}>
                    <TopBar presentation={presentation} modal={changeVisabilityPopup}/>
                    <Presentation
                        presentation={presentation}
                        changeSelectedPresentation={changeSelectedPresentation}
                        removeAllSelectedObjects={removeAllSelectedObjects}
                        changeSlide={changeSlide}
                        changePosition={changePosition}
                        changeSize={changeSize}
                        changeText={changeText}
                        changeSlidePosition={changeSlidePosition}
                    />
                    <Footer/>
                </div>
            </div>
    )
};
