import React from 'react';
import * as type from './core/types';
import style from './App.module.css'
import Footer from './Footer/Footer'
import TopBar from './TopBar/TopBar'
import Presentation from './Presentation/Presentation'
import Popup from './Popup/Popup'
import { createPresentation, getPresentationFromJSON } from './core/presentation/presentation';
import { useModal, usePresentationChanges } from './customHooks/customHooks';

interface Presentation
{
    presentation: type.Presentation
}

export default function App(props: Presentation)
{
    const {
        presentation,
        downloadPresentation,
        changeSelectedPresentation,
        removeAllSelectedObjects,
        changeSlide
    } = usePresentationChanges(props.presentation);
    const {isShowing, toggle} = useModal();
        return (
            <div className={style.appWrapper}>
                <Popup isShowind={isShowing} hide={toggle} setNewPresentation={downloadPresentation}/>
                <div className={style.app}>
                    <TopBar presentation={presentation} modal={toggle}/>
                    <Presentation
                        presentation={presentation}
                        changeSelectedPresentation={changeSelectedPresentation}
                        removeAllSelectedObjects={removeAllSelectedObjects}
                        changeSlide={changeSlide}/>
                    <Footer/>
                </div>
            </div>
    )
};
