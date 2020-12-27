import React from 'react';
import style from './Popup.module.css'
import * as type from '../core/types';
import {getPresentationFromJSON, createPresentation} from '../core/presentation/presentation';
import ImportPresentation from './ImportPresentation/ImportPresentation';
import { PopupState } from './PopupState';

interface Popup
{
    presentation: type.Presentation
    hidePopup: Function
    setNewPresentation: Function
    popupState: PopupState
}

export default function Popup(props: Popup)
{
    let render = <></>;
    let content;
    switch (props.popupState)
    {
        case PopupState.ImportPresentation:
            content = <ImportPresentation presentation={props.presentation} setNewPresentation={props.setNewPresentation}/>;
    }

    let presentation: type.Presentation = createPresentation({});
    if (props.popupState !== PopupState.Closed)
    {
        render = <div className={style.wrapper}>
            <div className={style.modal}>
                <div className={style.header}>
                    <button type="button" className={style.close_button} data-dismiss="modal" aria-label="Close"
                            onClick={(e) => props.hidePopup(PopupState.Closed)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div>
                    {content}
                </div>
            </div>
        </div>
    }
    return (
        render
    )
};