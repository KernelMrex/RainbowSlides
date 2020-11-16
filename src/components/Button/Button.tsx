import React from 'react'

import './Button.css'

interface ButtonProps
{
    size?: 's' | 'm' | 'x'
    color?: 'white'
    children: string
}

export default function Button(props: ButtonProps)
{
    const size = props.size ? `button_size_${props.size}` : 'button_size_m'
    const color = props.color ? `button_color_${props.color}` : 'button_color_white'

    return (
        <button className={`button ${size} ${color}`}>
            { props.children }
        </button>
    )
}