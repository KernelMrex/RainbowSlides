import React from 'react';
import * as type from './core/types';
import style from './App.module.css'
import Footer from './Footer/Footer'
import TopBar from './TopBar/TopBar'
import Presentation from './Presentation/Presentation'

interface Presentation
{
    presentation: type.Presentation
}

export default function App(props: Presentation)
{
    return (
        <div className={style.app}>
            <TopBar presentation={props.presentation}/>
            <Presentation presentation={props.presentation}/>
            <Footer/>
        </div>
    )
};
