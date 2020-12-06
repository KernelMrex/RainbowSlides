import React from 'react'
import './DropdownItem.css'

export interface DropdownItemProps
{
    text: string
    onClick?: Function
}

export default function DropdownItem(props: DropdownItemProps)
{
    const onClick = (event: React.MouseEvent<HTMLElement>): void => props.onClick ? props.onClick(event) : () => {
    }

    return (
        <div onClick={ onClick } className={ 'dropdown__item' }>
            { props.text }
        </div>
    )
}