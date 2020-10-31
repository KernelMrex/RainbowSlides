import React, { useState } from 'react';
import * as type from '../../../core/types';
import style from './ImportButton.module.css';
import PopupImport from './PopupImport/PopupImport';
import {getPresentationFromJSON} from '../../../core/presentation/presentation';

interface Presentation
{
    presentation: type.Presentation,
    class: string
}

export default function ImportButton(props: Presentation)
{
    const [popup, showPopup] = useState(false);
    return (
        <div>
            <a className={props.class} onClick={(e) => showPopup(true)}>Import</a>
            {popup &&
                <PopupImport presentation={props.presentation} closePopup={showPopup(false)}/>
            }
        </div>
    )
}