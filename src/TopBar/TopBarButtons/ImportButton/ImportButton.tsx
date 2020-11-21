import React from 'react';
import * as type from '../../../core/types';
import style from './ImportButton.module.css';
import { getPresentationFromJSON } from '../../../core/presentation/presentation';
import { PopupState } from '../../../Popup/PopupState';

interface Presentation
{
    presentation: type.Presentation,
    class: string
    modal: Function
}

export default function ImportButton(props: Presentation)
{
    return (
        <div>
            <a className={props.class} onClick={(e) => props.modal(PopupState.ImportPresentation)}>import</a>
        </div>
    )
}