import React from 'react';
import style from './Popup.module.css'
import * as type from '../core/types';
import {getPresentationFromJSON, createPresentation} from '../core/presentation/presentation';

interface Popup
{
    isShowind: boolean
    hide: Function
    setNewPresentation: Function
}

export default function Popup(props: Popup)
{
    let render = <></>;
    let presentation: type.Presentation = createPresentation({});
    if (props.isShowind)
    {
        render = <div className={style.wrapper}>
            <div className={style.modal}>
                <div className={style.header}>
                    <button type="button" className={style.closeButton} data-dismiss="modal" aria-label="Close"
                            onClick={(e) => props.hide()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div>
                    <input type='file' onChange={(e) => props.setNewPresentation(e)}
                           accept={'application/json'}/>
                </div>
            </div>
        </div>
    }
    return (
        render
    )
};