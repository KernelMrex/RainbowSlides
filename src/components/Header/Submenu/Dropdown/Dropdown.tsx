import React from 'react'
import DropdownItem from './DropdownItem/DropdownItem'
import './Dropdown.css'

export interface DropdownItemProps
{
    text: string
    stayOpenAfterClick?: boolean
    onClick?: (event?: React.MouseEvent<HTMLElement>) => void
}

interface DropdownProps
{
    text: string
    isActive: boolean
    activate: () => void
    close: () => void
    items: Array<DropdownItemProps>
}

export default function Dropdown(props: DropdownProps)
{
    const updateClassNameIfActive = (className: string, active: boolean) => {
        return active ? className + ' dropdown_active' : className
    }

    const getItems = (items?: Array<DropdownItemProps>): JSX.Element[] => {
        return items ? items.map((item, index) => <DropdownItem
            text={ item.text }
            onClick={ item.onClick }
            closeDropdown={ props.close }
            closeAfterClick={ !item.stayOpenAfterClick }
            key={ index }
        />) : []
    }

    return (
        <div className={ updateClassNameIfActive('dropdown', props.isActive) }>
            <div className={ 'dropdown__text' } onClick={ () => props.activate() }>{ props.text }</div>
            <div className={ 'dropdown__items' }>
                { getItems(props.items) }
            </div>
        </div>
    )
}
