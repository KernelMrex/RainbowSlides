import React from 'react';
import * as type from '../../../core/types';

interface Presentation
{
    presentation: type.Presentation,
    class: string
}

export default function PreviewButton(props: Presentation)
{
    return (
        <a className={props.class}>preview</a>
    )
}