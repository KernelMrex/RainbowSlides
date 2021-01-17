export const CLOSE_POPUP = 'CLOSE_POPUP'
export const IMPORT_PRESENTATION = 'IMPORT_PRESENTATION'

interface ClosePopupAction {
    type: typeof CLOSE_POPUP
}

interface ImportPresentationPopupAction {
    type: typeof IMPORT_PRESENTATION
}

export type PopupActionType =
    ClosePopupAction |
    ImportPresentationPopupAction