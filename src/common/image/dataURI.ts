import { Picture } from '../../core/types'

export function getDataURI(picture: Picture): string
{
    return `data:image/${ picture.extension };base64,${ picture.content }`
}