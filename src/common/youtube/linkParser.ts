export function getVideoIDFromURL(url: string): string | undefined
{
    const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[1].length === 11) ? match[1] : undefined
}