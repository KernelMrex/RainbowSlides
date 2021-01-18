import React from 'react';
import {getPayloadForDownloadImage} from '../../common/createPayloads';

interface Popup
{
    getNewImage: (source: string) => void
}

export default function ImportImage(props: Popup)
{
    return (
        <div>
            <input type={'text'} placeholder={'ссылка на изображение'} onBlur={(e) =>
            {
                if (e.target.value.length > 12)
                {
                    props.getNewImage(e.target.value)
                }
            }}/>
            <input type={'file'}
                   onChange={(e: any) => console.log(getPayloadForDownloadImage(e).then((image) => props.getNewImage(image as string)))}
                   accept={'image/jpeg,image/png'}/>
        </div>
    )
};