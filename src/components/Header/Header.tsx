import React from 'react'
import Logo from '../Logo/Logo'
import './Header.css'
import Submenu from './Submenu/Submenu';
import Button from '../Button/Button';
import { CircleBlock, Presentation, RectangleBlock, Slide, TextBlock } from '../../core/types';
import { exportPDF } from '../../core/pdf/export';

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
                                { text: 'Экспорт', onClick: onExportClick },
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

const mockPresentation: Presentation = {
    name: 'Mock presentation',
    slides: [],
    selection: {
        objects: [],
        slide: null
    }
}

const mockSlide: Slide = {
    id: 'mock-slide',
    background: {
        hex: '#ffffff',
    },
    objects: []
}

const mockRectangle: RectangleBlock = {
    id: 'mock-rectangle',
    name: 'Mock rectangle',
    position: { x: 10, y: 20 },
    type: 'rectangle',
    width: 30,
    height: 40
}

const mockTextBlock: TextBlock = {
    id: 'mock-text',
    name: 'Mock text block',
    position: { x: 10, y: 20 },
    type: 'text',
    width: 30,
    height: 40,
    font: {
        family: 'test-font-family',
        size: 18,
        weight: 400,
        style: 'none'
    },
    content: 'Mock text block content',
    color: { hex: '#ffffff' }
}

const mockCircle: CircleBlock = {
    id: 'mock-circle',
    name: 'Mock circle',
    position: { x: 20, y: 40 },
    type: 'circle',
    width: 14,
    height: 27
}

function onExportClick(): void
{
    const slides = [
        {
            ...mockSlide,
            id: 'slide-0',
            objects: [
                {
                    ...mockRectangle,
                },
                {
                    ...mockTextBlock,
                    content: 'slide 0 text',
                    color: { hex: '#ff0000' }
                },
                {
                    ...mockCircle
                }
            ]
        },
        {
            ...mockSlide,
            id: 'slide-1',
            objects: [
                {
                    ...mockRectangle,
                },
                {
                    ...mockTextBlock,
                    content: 'slide 1 text',
                    color: { hex: '#0585fc' }
                }
            ]
        },
    ]

    exportPDF({ ...mockPresentation, slides: slides })
}