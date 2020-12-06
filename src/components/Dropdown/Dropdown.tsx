import React, { useState } from 'react'
import './Dropdown.css'
import DropdownItem, { DropdownItemProps } from './DropdownItem/DropdownItem';

interface DropdownProps
{
    text: string
    items?: Array<DropdownItemProps>
}

export default function Dropdown(props: DropdownProps)
{
    const [ active, setActive ] = useState(false)

    const updateClassNameIfActive = (className: string, active: boolean) => {
        return active ? className + ' dropdown_active' : className
    }

    const getItems = (items?: Array<DropdownItemProps>): JSX.Element[] => {
        return items ? items.map(item => <DropdownItem text={ item.text } onClick={ item.onClick }/>) : []
    }

    return (
        <div className={ updateClassNameIfActive('dropdown', active) }>
            <div className={ 'dropdown__text' } onClick={ () => setActive(!active) }>{ props.text }</div>
            <div className={ 'dropdown__items' }>
                { getItems(props.items) }
            </div>
        </div>
    )
}

Dropdown.Item = DropdownItem