import React, { useState } from 'react'
import DropdownItem from './DropdownItem/DropdownItem'
import './Dropdown.css'

interface DropdownProps
{
    text: string,
    children?: Array<JSX.Element> | JSX.Element
}

export default function Dropdown(props: DropdownProps)
{
    const [ active, setActive ] = useState(false)

    const updateClassNameIfActive = (className: string, active: boolean) => {
        return active ? className + ' dropdown_active' : className
    }

    const getItems = (children?: Array<JSX.Element> | JSX.Element) => {
        if (Array.isArray(children))
        {
            return children.map(item => <div className={ 'dropdown__item' }>{ item }</div>)
        }
        return [ <div className={ 'dropdown__item' }>{ children }</div> ]
    }

    return (
        <div
            className={ updateClassNameIfActive('dropdown', active) }
        >
            <div className={ 'dropdown__text' } onClick={ () => setActive(!active) }>{ props.text }</div>
            <div className={ 'dropdown__items' }>
                { getItems(props.children) }
            </div>
        </div>
    )
}

Dropdown.Item = DropdownItem