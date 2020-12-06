import React, { useState } from 'react'
import Dropdown from './Dropdown/Dropdown';
import { DropdownItemProps } from './Dropdown/DropdownItem/DropdownItem';
import './Submenu.css'

interface SubmenuItemProps
{
    type: 'button' | 'dropdown'
    text: string
}

interface SubmenuDropdownItemProps extends SubmenuItemProps
{
    items: Array<DropdownItemProps>
    isActive?: boolean
    onOpen?: Function
}

interface SubmenuProps
{
    items: Array<SubmenuItemProps | SubmenuDropdownItemProps>
}

function useDropdownActive(initialDropdownIndex: number): [ number, Function ]
{
    const [ activeDropdown, setActiveDropdown ] = useState(initialDropdownIndex)

    return [ activeDropdown, (dropdownIndex: number): void => {
        if (activeDropdown === dropdownIndex)
        {
            setActiveDropdown(-1)
            return
        }
        setActiveDropdown(dropdownIndex)
    } ]
}

export default function Submenu(props: SubmenuProps)
{
    const [ activeDropdown, setActiveDropdown ] = useDropdownActive(-1)

    const items = props.items.map((item, index) => {
        switch (item.type)
        {
            case 'button':
                return <div className={ 'submenu__item' } key={ index }>{ item.text }</div>
            case 'dropdown':
                return <div className={ 'submenu__item' } key={ index }>
                    <Dropdown
                        text={ item.text }
                        items={ (item as SubmenuDropdownItemProps).items }
                        isActive={ index === activeDropdown }
                        onButtonClick={ () => {
                            setActiveDropdown(index)
                        } }
                    />
                </div>
            default:
                return <></>
        }
    })

    return <div className={ 'submenu' }>{ items }</div>
}