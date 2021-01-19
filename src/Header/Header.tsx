import React from 'react'
import { connect } from 'react-redux'
import { renamePresentation } from '../store/presentation/actions'
import { RootState } from '../store/store'

import Logo from './Logo/Logo'
import './Header.css'
import Submenu from './Submenu/Submenu'
import { Input } from '../Input/Input'
import Button from '../Button/Button'
import downloadPresentation from '../core/exportJSON/exportJSON'
import {closePopup, importPresentationPopup} from '../store/popup/actions'

const mapState = (state: RootState) => ({ presentation: state.presentation })
const mapDispatch = { renamePresentation: renamePresentation, importPresentationPopup: importPresentationPopup }

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch
type HeaderProps = StateProps & DispatchProps

function Header(props: HeaderProps)
{
    return (
        <div className={ 'header' }>
            <div className={ 'header__logo' }>
                <Logo/>
            </div>
            <div className={ 'header__title-wrapper' }>
                <Input text={ props.presentation.name } className={ 'header__title' }
                       onUpdate={ (value: string) => props.renamePresentation(value) }/>
                <div className={ 'header__submenu' }>
                    <Submenu items={ [
                        {
                            type: 'dropdown',
                            text: 'Файл',
                            items: [
                                {
                                    text: 'Открыть',
                                    onClick: (event) => props.importPresentationPopup(),
                                    stayOpenAfterClick: false
                                },
                                {
                                    text: 'Сохранить',
                                    onClick: (event) => downloadPresentation(props.presentation),
                                    stayOpenAfterClick: false
                                },
                                {
                                    text: 'Экспорт в PDF',
                                    onClick: () => console.log('Export pdf'),
                                    stayOpenAfterClick: false
                                }
                            ],
                        },
                        {
                            type: 'dropdown',
                            text: 'Помощь',
                            items: [
                                { text: 'Инструкция' },
                                { text: 'Связь с разработчиками' },
                            ],
                        },
                    ] }/>
                </div>
            </div>
            <div className={ 'header__buttons-wrapper' }>
                <Button color={ 'white' } size={ 'm' }>Предпросмотр</Button>
            </div>
        </div>
    )
}

export default connect(mapState, mapDispatch)(Header)