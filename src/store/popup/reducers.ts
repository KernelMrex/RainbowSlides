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
        case 'IMPORT_PRESENTATION':
            return {state: 'importPresentation'}
        case 'IMPORT_IMAGE':
            return {state: 'importImage'}
        case 'IMPORT_BACKGROUND_IMAGE':
            return {state: 'importBackgroundImage'}
        default:
            return state
    }
}