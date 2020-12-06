import React from 'react'

interface CounterProps
{
    current: number
    max: number
}

export default function Counter(props: CounterProps)
{
    return (
        <div>{ props.current }/{ props.max }</div>
    )
}