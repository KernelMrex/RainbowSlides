import React, { ChangeEvent, useState } from 'react'
import './Input.css'

interface InputProps
{
    onUpdate: (value: string) => void
    text?: string
    placeHolder?: string
    className?: string
}

export function Input(props: InputProps)
{
    const [ value, setValue ] = useState(props.text !== undefined ? props.text : '')

    if (value !== props.text)
    {
        setValue(props.text as string)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onUpdate(e.target.value)
        setValue(e.target.value)
    }

    return <input
        className={ 'input ' + (props.className ? props.className : '') }
        placeholder={ props.placeHolder }
        value={ value }
        onChange={ onChange }
    />
}