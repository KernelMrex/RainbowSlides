import React from 'react';
import style from './TopBarButtons.module.css';

export default function TopBarButtons()
{
    return (
        <div className={style.buttons_wrapper}>
            <div className={style.button_export}>
                <button className={style.content}>export</button>
            </div>
            <div className={style.button_import}>
                <button className={style.content}>import</button>
            </div>
            <div className={style.button_preview}>
                <button className={style.content}>preview</button>
            </div>
        </div>
    )
}