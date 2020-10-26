import React from 'react';
import style from './TopBarButtons.module.css';

export default function TopBarButtons()
{
    return (
        <div className={style.buttons_wrapper}>
            <div className={style.button_export}>
                <button>export</button>
            </div>
            <div className={style.button_import}>
                <button>import</button>
            </div>
            <div className={style.button_preview}>
                <button>preview</button>
            </div>
        </div>
    )
}