import React from 'react'
import Logo from '../Logo/Logo'
import './Header.css'
import Submenu from './Submenu/Submenu';
import Button from '../Button/Button';

export default function Header()
{
    return (
        <div className={ 'header' }>
            <div className={ 'header__logo' }>
                <Logo/>
            </div>
            <div className={ 'header__title-wrapper' }>
                <h1 className={ 'header__title' }>Название презентации</h1>
                <div className={ 'header__submenu' }>
                    <Submenu items={[
                        {
                            type: 'dropdown',
                            text: 'Файл',
                            items: [
                                { text: 'Открыть' },
                                { text: 'Сохранить' },
                                { text: 'Экспорт' },
                            ]
                        },
                        {
                            type: 'dropdown',
                            text: 'Помощь',
                            items: [
                                { text: 'Инструкция' },
                                { text: 'Связь с разработчиками' },
                            ]
                        }
                    ]}/>
                </div>
            </div>
            <div className={ 'header__buttons-wrapper' }>
                <Button color={ 'white' } size={ 'm' }>Предпросмотр</Button>
            </div>
        </div>
    )
}