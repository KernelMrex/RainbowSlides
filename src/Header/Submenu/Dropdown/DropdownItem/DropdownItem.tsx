import React from 'react'
import './DropdownItem.css'

interface DropdownItemProps
{
    text: string
    closeAfterClick: boolean
    closeDropdown: () => void
    onClick?: (event?: React.MouseEvent<HTMLElement>) => void
}

export default function DropdownItem(props: DropdownItemProps)
{
    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        if (props.onClick)
        {
            props.onClick(event)
        }

        if (props.closeAfterClick)
        {
            props.closeDropdown()
        }
    }

    return (
        <div onClick={ onClick } className={ 'dropdown__item' }>
            { props.text }
        </div>
    )
}