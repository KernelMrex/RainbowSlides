import React from 'react';
import * as type from '../../../core/types';
import style from './ImportButton.module.css';
import {getPresentationFromJSON} from '../../../core/presentation/presentation';


interface Presentation
{
    presentation: type.Presentation,
    class: string
}

export default function ImportButton(props: Presentation)
{
    return (
        <div>
            <input className={props.class} type='file' onChange={(e) => rerenderAppWithNewPresentation(e)}/>
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