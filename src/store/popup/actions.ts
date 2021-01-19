import {CLOSE_POPUP, IMPORT_IMAGE, IMPORT_PRESENTATION, PopupActionType, IMPORT_BACKGROUND_IMAGE} from "./types";

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

export function importImagePopup(): PopupActionType
{
    return {
        type: IMPORT_IMAGE
    }
}

export function importBackgroundImagePopup(): PopupActionType
{
    return {
        type: IMPORT_BACKGROUND_IMAGE
    }
}