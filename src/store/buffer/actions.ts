import {BufferActionType, COPY_ELEMENT} from "./types";
import {SlideObject} from "../../core/types";

export function copyElement(object: SlideObject | undefined): BufferActionType
{
    return {
        type: COPY_ELEMENT,
        payload: object
    }
}