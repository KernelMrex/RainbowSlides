import React from 'react'

import Logo from '../Logo/Logo'

import './Header.css'
import Submenu from './Submenu/Submenu';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';

export default function Header()
{
    return (
        <div className={'header'}>
            <div className={'header__logo'}>
                <Logo/>
            </div>
            <div className={'header__title-wrapper'}>
                <h1 className={'header__title'}>Название презентации</h1>
                <div className={'header__submenu'}>
                    <Submenu>
                        <Dropdown text={'Файл'}>
                            <Dropdown.Item text={'Открыть'}/>
                            <Dropdown.Item text={'Сохранить'}/>
                            <Dropdown.Item text={'Экспорт'}/>
                        </Dropdown>
                        <Dropdown text={'Помощь'}>
                            <Dropdown.Item text={'Инструкция'}/>
                            <Dropdown.Item text={'Связь с разработчиками'}/>
                        </Dropdown>
                    </Submenu>
                </div>
            </div>
            <div className={'header__buttons-wrapper'}>
                <Button color={'white'} size={'m'}>Preview</Button>
            </div>
        </div>
    )
}