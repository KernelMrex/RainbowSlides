import React, { useState } from 'react';
import * as type from '../../../../core/types';
import style from './ImportButton.module.css';
import {getPresentationFromJSON} from '../../../../core/presentation/presentation';

interface Presentation
{
    presentation: type.Presentation,
    closePopup: void
}

export default function PopupImport(props: Presentation)
{
    const [presentation, setNewPresentation] = useState(props.presentation)
    return (
        <div>
            <input type='file' onChange={(e) => rerenderAppWithNewPresentation(e)} accept={'application/json'}/>
            <button onClick={(e) => props.closePopup}>Close</button>
        </div>
    )
}

function rerenderAppWithNewPresentation(event: any)
{
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.onload = () =>
    {
        let JSONString = fileReader.result;
        if (typeof JSONString === 'string')
        {
            let newPresentation: type.Presentation = getPresentationFromJSON(JSONString);
            console.log(newPresentation)
        }
    }

    fileReader.readAsText(file);
}