import {Buffer, SlideObject} from "../../core/types"
import {BufferActionType} from "./types";

const initialState: Buffer<SlideObject> = {
    object: undefined
}

export function bufferReducer(state: Buffer<SlideObject> = initialState, action: BufferActionType): Buffer<SlideObject>
{
    switch (action.type)
    {
        case 'COPY_ELEMENT':
            return {object: action.payload}
        default:
            return state
    }
}