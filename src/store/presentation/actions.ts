import { PresentationActionType, RENAME_PRESENTATION } from './types'

export function renamePresentation(name: string): PresentationActionType
{
    return {
        type: RENAME_PRESENTATION,
        payload: name
    }
}