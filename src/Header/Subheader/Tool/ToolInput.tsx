import React from 'react'
import './Tool.css'

interface ToolInput
{
    content?: string,
    onClick: (color: string) => void,
    colorPick?: boolean
}

export default function ToolInput(props: ToolInput) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => props.onClick(e.target.value)
    const contentClassName = props.content ? `tool__${ props.content }` : ''

    return (
        <input type={ 'color' } className={ `tool ${ contentClassName }` } onChange={ onChange }/>
    )
}