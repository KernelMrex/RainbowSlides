import React from 'react'
import './Tool.css'

interface Tool
{
    content: string,
    onClick: () => void
}

export default function Tool(props: Tool)
{
    return (
        <div className={ `tool tool__${props.content}` } onClick={(e) => props.onClick()}>
        </div>
    )
}