import React from 'react'
import Counter from '../Counter/Counter';
import './Subheader.css'

export default function Subheader()
{
    return (
        <div className={ 'subheader' }>
            <div className={ 'subheader__column subheader__column_content_center' }>
                <Counter current={ 2 } max={ 3 }/>
            </div>
        </div>
    )
}