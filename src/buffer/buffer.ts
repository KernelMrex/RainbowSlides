import {Buffer, SlideObject} from '../core/types'

type BufferObject = SlideObject
let buffer: Buffer<BufferObject> = newBuffer<BufferObject>()

export function newBuffer<BufferObject>(): Buffer<BufferObject>
{
    return {object: null}
}

export function getBufferElement(): BufferObject | null
{
    return buffer.object
}

export function setBufferElement(element: BufferObject | null): void
{
    buffer.object = element
}