import React from 'react';
import * as type from './core/types';
import style from './App.module.css'
import Footer from './Footer/Footer'
import TopBar from './TopBar/TopBar'
import Presentation from './Presentation/Presentation'
import Popup from './Popup/Popup'
import { createPresentation, getPresentationFromJSON } from './core/presentation/presentation';
import { useModal, useNewPresentation } from './CustomHooks/CustomHooks';

interface Presentation
{
    presentation: type.Presentation
}

export default function App(props: Presentation)
{
    const {
        presentation,
        downloadPresentation,
        changePosition,
        changeSelectedPresentation,
        removeAllSelectedObjects,
        changeSlide
    } = useNewPresentation(props.presentation);

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
                    />
                    <Footer/>
                </div>
            </div>
    )
};
