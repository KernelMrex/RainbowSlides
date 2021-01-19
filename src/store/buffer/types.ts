import {SlideObject} from "../../core/types";

export const COPY_ELEMENT = 'COPY_ELEMENT'

interface CopyElement {
    type: typeof COPY_ELEMENT,
    payload: SlideObject | undefined
}

export type BufferActionType = CopyElement