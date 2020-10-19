import React from 'react';
import * as type from '../core/types';
import '../style/currentSlide.css'

interface Slide {
    currentSlide: type.Slide | null
}

export default function CurrentSlide(props: Slide) {
    return (
        <div className="b-slide__wrapper">
            <div className="b-slide__content">

            </div>
        </div>
    )


    // if (props.currentSlide !== null) {
    //     return (
    //         <div className="current-slide">
    //             <li className='slide'>
    //                 {/*{props.currentSlide.objects}*/}
    //                 {/*{props.currentSlide.background}*/}
    //                 slide's parts
    //             </li>
    //         </div>
    //     );
    // } else {
    //     return (
    //         <div className="current-slide">
    //             <span>no current slide</span>
    //         </div>
    //     );
    // }
}