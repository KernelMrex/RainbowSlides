import React, {useRef, useState} from 'react'
import './Tool.css'

interface ToolInput
{
    content?: string,
    items?: Array<number>,
    onClick: (color: any) => void,
    colorPick?: boolean,
    type: 'color' | 'select'
}

export default function ToolInput(props: ToolInput)
{
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => props.onClick(e.target.value)
    const contentClassName = props.content ? `tool__${props.content}` : ''
    let render = <></>
    if (props.type === 'select' || props.items || props.items !== undefined)
    {
        render =
            <select className={`tool ${contentClassName}`} onChange={(event) => props.onClick(event.target.value)}>
                <option>--</option>
                {(props.items as Array<number>).map((item, index) =>
                {
                    return <option key={index} value={ item }>{ item }</option>
                })}
            </select>
    } else
    {
        render = <input type={'color'} className={`tool ${contentClassName}`} onChange={onChange}/>
    }

    return render
}