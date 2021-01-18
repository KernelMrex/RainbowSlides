export const CLOSE_POPUP = 'CLOSE_POPUP'
export const IMPORT_PRESENTATION = 'IMPORT_PRESENTATION'
export const IMPORT_IMAGE = 'IMPORT_IMAGE'

interface ClosePopupAction {
    type: typeof CLOSE_POPUP
}

interface ImportPresentationPopupAction {
    type: typeof IMPORT_PRESENTATION
}

interface ImportImagePopupAction {
    type: typeof IMPORT_IMAGE
}

export type PopupActionType =
    ClosePopupAction |
    ImportPresentationPopupAction |
    ImportImagePopupAction