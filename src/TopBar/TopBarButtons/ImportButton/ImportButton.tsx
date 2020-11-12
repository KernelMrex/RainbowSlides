import React, { useState } from 'react';
import * as type from '../../../core/types';
import style from './ImportButton.module.css';
import { getPresentationFromJSON } from '../../../core/presentation/presentation';

interface Presentation
{
    presentation: type.Presentation,
    class: string
    modal: Function
}

export default function ImportButton(props: Presentation)
{
    const [popup, showPopup] = useState(false);
    return (
        <div>
            <a className={props.class} onClick={(e) => props.modal()}>import</a>
        </div>
    )
}