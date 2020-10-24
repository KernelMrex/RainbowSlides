import React from 'react';
import style from './footer.module.css'

export default function Footer()
{
    return (
        <footer className={style.footer}>
            <div className={style.content_wrapper}>
                <span>@ RainbowSlides is better that no rainbow google slides</span>
            </div>
        </footer>
    )
}