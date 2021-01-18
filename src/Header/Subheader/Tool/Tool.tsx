import React from 'react'
import './Tool.css'

interface Tool
{
    content?: string,
    onClick: (event?: React.MouseEvent<HTMLElement>) => void,
    colorPick?: boolean
}

export default function Tool(props: Tool)
{
    const onClick = (event: React.MouseEvent<HTMLElement>) => props.onClick(event)
    const contentClassName = props.content ?  `tool__${ props.content }` : ''

    return (
        <div className={ `tool ${contentClassName}` } onClick={ onClick }/>
    )
}