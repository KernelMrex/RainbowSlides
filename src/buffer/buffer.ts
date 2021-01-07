import {Buffer, SlideObject} from '../core/types'

type BufferObject = SlideObject
let buffer: Buffer<BufferObject> = newBuffer<BufferObject>()

export function newBuffer<BufferObject>(): Buffer<BufferObject>
{
    return {object: undefined}
}

export function getBufferElement(): BufferObject | undefined
{
    return buffer.object
}

export function setBufferElement(element: BufferObject | undefined): void
{
    buffer.object = element
}