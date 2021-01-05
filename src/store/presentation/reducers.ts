import { changePresentationName } from '../../core/presentation/presentation'
import { Presentation } from '../../core/types'
import { PresentationActionType } from './types'

const initialState: Presentation = {
    name: 'New presentation',
    slides: [],
    selection: {
        objects: [],
        slide: null
    },
}

export function presentationReducer(state: Presentation = initialState, action: PresentationActionType): Presentation
{
    switch (action.type)
    {
        case 'RENAME_PRESENTATION':
            return changePresentationName(state, { name: action.payload })
        default:
            return state
    }
}