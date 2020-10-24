import React from 'react';
import style from './name.module.css'

interface Name {
    name: string
}

export default function Name(props: Name)
{
    return (
        <div className={style.name_wrapper}>
            <div className={style.name}>
                <span className={style.name_content}>{props.name}</span>
            </div>
        </div>
    )
}