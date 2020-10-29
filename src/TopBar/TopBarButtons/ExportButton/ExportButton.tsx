import React, { useState } from 'react';
import * as type from '../../../core/types';
import {getJSONOfPresentation} from '../../../core/presentation/presentation';

interface Presentation
{
    presentation: type.Presentation,
    class: string
}

export default function ExportButton(props: Presentation)
{
    const [fileHref, setFileHref] = useState('');
    return (
        <a className={props.class} href={fileHref}
           onMouseEnter={() => setFileHref(exportPresentation(props.presentation))}
           download={'presentation.json'}>export</a>
    )
}

function exportPresentation(presentation: type.Presentation)
{
    const jsonOfPresentation: string = getJSONOfPresentation(presentation);
    const buildExportData = (exportData: string) => 'data:text/json;charset=utf-8,' + encodeURIComponent(exportData);
    return buildExportData(jsonOfPresentation)
}