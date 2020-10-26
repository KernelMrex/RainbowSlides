import React from 'react';
import * as type from '../core/types';
import style from './TopBar.module.css';
import Name from './Name/Name';
import TopBarButtons from './TopBarButtons/TopBarButtons';

interface Presentation
{
    presentation: type.Presentation
}

export default function TopBar(props: Presentation)
{
    return (
        <div className={style.wrapper}>
            <Name name={props.presentation.name}/>
            <TopBarButtons/>
        </div>
    )
}