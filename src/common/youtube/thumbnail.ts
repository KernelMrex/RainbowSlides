import { Picture } from '../../core/types'
import { getVideoIDFromURL } from './linkParser'

export async function getThumbnail(url: string): Promise<Picture>
{
    const videoID = getVideoIDFromURL(url)

    const thumbnailURL = `https://img.youtube.com/vi/${ videoID }/0.jpg`

    const response = await fetch(new Request(thumbnailURL), { method: 'GET' })

    const buffer = await response.arrayBuffer()

    return {
        content: arrayBufferToBase64(buffer),
        extension: 'jpg'
    }
}

function arrayBufferToBase64(buffer: ArrayBuffer)
{
    let binary: string = ''

    const bytes: never[] = [].slice.call(new Uint8Array(buffer))

    bytes.forEach(byte => binary += String.fromCharCode(byte))

    return window.btoa(binary)
}