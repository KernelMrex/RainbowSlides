import React from 'react';
import * as type from '../../core/types';

interface Popup
{
    presentation: type.Presentation
    setNewPresentation: Function
}

export default function ImportPresentation(props: Popup)
{
    return (
        <div>
            <input type='file' onChange={(e) => props.setNewPresentation(e)}
                   accept={'application/json'}/>
        </div>
    )
};