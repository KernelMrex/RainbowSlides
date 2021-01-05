import React from 'react'
import './Slide.css'

interface SlideProps
{
    id: string
}

export default function Slide(props: SlideProps)
{
    return (
        <div className={ 'slide' }></div>
    )
}