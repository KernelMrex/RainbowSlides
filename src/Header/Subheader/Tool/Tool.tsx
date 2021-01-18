import React from 'react'
import './Tool.css'
import {PresentationActionType} from '../../../store/presentation/types'
import SlideObject from '../../../CurrentSlide/SlideObject/SlideObject'

interface Tool
{
    content: string,
    onClick: (event?: React.MouseEvent<HTMLElement>) => void
}

export default function Tool(props: Tool)
{
    const onClick = (event: React.MouseEvent<HTMLElement>) =>
    {
        props.onClick(event)
    }
    return (
        <div className={`tool tool__${props.content}`} onClick={onClick}>
        </div>
    )
}