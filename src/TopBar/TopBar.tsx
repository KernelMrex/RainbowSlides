import React from 'react';
import '../style/topBar.css'

interface Name
{
    name: string
}

export default function TopBar(props: Name)
{
    return (
        <div className="b-topbar__wrapper">
            <div className="b-topbar__name_wrapper">
                <div className="b-topbar__name">
                    <span className="b-topbar__name_content">{props.name}</span>
                </div>
            </div>
        </div>
    )
}