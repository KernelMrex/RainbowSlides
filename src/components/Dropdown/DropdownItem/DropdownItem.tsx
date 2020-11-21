import React from 'react'
import './DropdownItem.css'

interface DropdownItemProps
{
    text: string
    onClick?: Function
}

export default function DropdownItem(props: DropdownItemProps)
{
    const onClick = (event: React.MouseEvent<HTMLElement>): void => props.onClick ? props.onClick(event) : () => {}

    return (
        <div onClick={onClick}>
            {props.text}
        </div>
    )
}