import React from 'react'
import './Tool.css'

interface Tool
{
    content: string,
    onClick: (event?: React.MouseEvent<HTMLElement>) => void,
    colorPick?: boolean
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