import React from 'react';
import * as type from '../../core/types';
import { getPayloadForDownloadPresentation } from '../../common/createPayloads';
import {Presentation} from "../../core/types";

interface Popup
{
    setNewPresentation: (presentation: Presentation) => void
}

export default function ImportPresentation(props: Popup)
{
    return (
        <div>
            <input type='file' onChange={(e: any) => getPayloadForDownloadPresentation(e).then((presentation) => props.setNewPresentation(presentation as Presentation))}
                   accept={'application/json'}/>
        </div>
    )
};