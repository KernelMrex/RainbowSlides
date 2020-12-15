import React, { useRef, useState } from 'react'
import Dropdown, { DropdownItemProps } from './Dropdown/Dropdown'
import { useClickOutsideNotifier } from '../../../hooks/useClickOutsideNotifier'
import './Submenu.css'

interface SubmenuItemProps
{
    text: string
}

interface SubmenuButtonItemProps extends SubmenuItemProps
{
    type: 'button'
}

interface SubmenuDropdownItemProps extends SubmenuItemProps
{
    type: 'dropdown'
    items: Array<DropdownItemProps>
    isActive?: boolean
    onOpen?: Function
}

interface SubmenuProps
{
    items: Array<SubmenuButtonItemProps | SubmenuDropdownItemProps>
}

const ANY_DROPDOWN_ACTIVE: number = -1

function useDropdownActive(initialDropdownIndex: number): [ number, Function ]
{
    const [ activeDropdown, setActiveDropdown ] = useState(initialDropdownIndex)

    return [ activeDropdown, (dropdownIndex: number): void => {
        if (activeDropdown === dropdownIndex)
        {
            setActiveDropdown(ANY_DROPDOWN_ACTIVE)
            return
        }
        setActiveDropdown(dropdownIndex)
    } ]
}

export default function Submenu(props: SubmenuProps)
{
    const [ activeDropdown, setActiveDropdown ] = useDropdownActive(ANY_DROPDOWN_ACTIVE)

    const ref = useRef<HTMLDivElement>(null)
    useClickOutsideNotifier(ref, () => {
        setActiveDropdown(ANY_DROPDOWN_ACTIVE)
    })

    const items = props.items.map((item, index) => {
        switch (item.type)
        {
            case 'button':
                return <div className={ 'submenu__item' } key={ index }>{ item.text }</div>
            case 'dropdown':
                return <div className={ 'submenu__item' } key={ index }>
                    <Dropdown
                        text={ item.text }
                        items={ item.items }
                        activate={ () => setActiveDropdown(index) }
                        close={ () => setActiveDropdown(ANY_DROPDOWN_ACTIVE) }
                        isActive={ index === activeDropdown }
                    />
                </div>
            default:
                return <></>
        }
    })

    return <div className={ 'submenu' } ref={ ref }>{ items }</div>
}