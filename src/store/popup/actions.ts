import {CLOSE_POPUP, IMPORT_PRESENTATION, PopupActionType} from "./types";

export function closePopup(): PopupActionType
{
    return {
        type: CLOSE_POPUP
    }
}

export function importPresentationPopup(): PopupActionType
{
    return {
        type: IMPORT_PRESENTATION
    }
}
