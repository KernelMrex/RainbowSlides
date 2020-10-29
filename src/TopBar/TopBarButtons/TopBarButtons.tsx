import React from 'react';
import style from './TopBarButtons.module.css';
import ExportButton from './ExportButton/ExportButton';
import ImportButton from './ImportButton/ImportButton';
import PreviewButton from './PreviewButton/PreviewButton';
import * as type from '../../core/types';

interface Presentation
{
    presentation: type.Presentation
}

export default function TopBarButtons(props: Presentation)
{
    return (
        <div className={style.buttons_wrapper}>
            <div className={style.button_export}>
                <ExportButton class={style.content} presentation={props.presentation}/>
            </div>
            <div className={style.button_import}>
                <ImportButton class={style.content} presentation={props.presentation}/>
            </div>
            <div className={style.button_preview}>
                <PreviewButton class={style.content} presentation={props.presentation}/>
            </div>
        </div>
    )
}