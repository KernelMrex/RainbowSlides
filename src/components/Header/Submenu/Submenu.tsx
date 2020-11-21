import React from 'react'

import './Submenu.css'

interface SubmenuProps
{
    children: Array<JSX.Element> | JSX.Element
}

export default function Submenu(props: SubmenuProps)
{
    let items;

    if (Array.isArray(props.children))
    {
        items = props.children.map(item => <div className={'submenu__item'}>{item}</div>)
    }
    else
    {
        items = [ <div className={'submenu__item'}>{props.children}</div> ];
    }

    return (
        <div className={'submenu'}>
            {items}
        </div>
    )
}