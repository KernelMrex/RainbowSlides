import { StateHistory, Presentation } from '../core/types';
import { createPresentation } from '../core/presentation/presentation';
import * as history from '../core/history/history';

let state: Presentation = createPresentation()
let stateHistory: StateHistory<Presentation> = history.newHistory<Presentation>()

export function dispatch(func: CallableFunction, payload: any[] = []): void
{
    const newState = func(state, ...payload)
    history.add(stateHistory, newState)
    state = newState
}

export function getState(): Presentation
{
    return { ...state }
}

export function undoAction(): void
{
    stateHistory = history.undo<Presentation>(stateHistory)
    const newState = history.getUndoTail<Presentation>(stateHistory)
    if (newState !== undefined)
    {
        state = newState
    }
}

export function redoAction(): void
{
    stateHistory = history.redo<Presentation>(stateHistory)
    const newState = history.getUndoTail<Presentation>(stateHistory)
    if (newState !== undefined)
    {
        state = newState
    }
}
