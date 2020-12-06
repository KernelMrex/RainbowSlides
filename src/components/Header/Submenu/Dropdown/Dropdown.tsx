import React from 'react'
import DropdownItem, { DropdownItemProps } from './DropdownItem/DropdownItem';
import './Dropdown.css'

interface DropdownProps
{
    text: string
    isActive: boolean
    onButtonClick: Function
    items?: Array<DropdownItemProps>
}

export default function Dropdown(props: DropdownProps)
{
    const updateClassNameIfActive = (className: string, active: boolean) => {
        return active ? className + ' dropdown_active' : className
    }

    const getItems = (items?: Array<DropdownItemProps>): JSX.Element[] => {
        return items ? items.map((item, index) => <DropdownItem text={ item.text } onClick={ item.onClick } key={index}/>) : []
    }

    return (
        <div className={ updateClassNameIfActive('dropdown', props.isActive) }>
            <div className={ 'dropdown__text' } onClick={() => props.onButtonClick()}>{ props.text }</div>
            <div className={ 'dropdown__items' }>
                { getItems(props.items) }
            </div>
        </div>
    )
}
