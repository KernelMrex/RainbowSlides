import { PopupActionType } from "./types"
import { Popup } from "../../core/types"

const initialState: Popup = {
    state: 'close'
}

export function popupReducer(state: Popup = initialState, action: PopupActionType): Popup
{
    switch (action.type)
    {
        case 'CLOSE_POPUP':
            return {state: 'close'}
            break
        case 'IMPORT_PRESENTATION':
            return {state: 'importPresentation'}
            break
        case 'IMPORT_IMAGE':
            return {state: 'importImage'}
            break
        default:
            return state
    }
}