export const RENAME_PRESENTATION = 'RENAME_PRESENTATION'

interface RenamePresentationAction {
    type: typeof RENAME_PRESENTATION
    payload: string
}

export type PresentationActionType = RenamePresentationAction