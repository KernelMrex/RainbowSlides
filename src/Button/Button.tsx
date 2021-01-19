import React from 'react'

import './Button.css'

interface ButtonProps
{
    size?: 's' | 'm' | 'x'
    color?: 'white'
    children: string
    onClick?: Function
}

export default function Button(props: ButtonProps)
{
    const size = props.size ? `button_size_${props.size}` : 'button_size_m'
    const color = props.color ? `button_color_${props.color}` : 'button_color_white'

    const onClickCallback = () => {
        if (props.onClick !== undefined)
        {
            props.onClick()
        }
    }

    return (
        <button className={`button ${size} ${color}`} onClick={onClickCallback}>
            { props.children }
        </button>
    )
}