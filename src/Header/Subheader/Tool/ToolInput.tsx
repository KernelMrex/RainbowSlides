import React from 'react'
import './Tool.css'

interface ToolInput
{
    content: string,
    onClick: (color: string) => void,
    colorPick?: boolean
}

export default function ToolInput(props: ToolInput)
{
    return (
        <input type={'color'} className={`tool tool__${props.content}`} onChange={(e) => props.onClick(e.target.value)}/>
    )
}