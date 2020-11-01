import { StateHistory, Presentation } from '../core/types';
import { createPresentation } from '../core/presentation/presentation';
import * as history from '../core/history/history';

let state: Presentation = createPresentation()
let stateHistory: StateHistory<Presentation> = history.newHistory<Presentation>()

export function dispatch(func: CallableFunction, payload: any[] = []): void
{
    history.add(stateHistory, maybeUpdateState(func(state, ...payload)))
}

export function getState(): Presentation
{
    return { ...state }
}

export function undoAction(): void
{
    maybeUpdateState(history.getUndoTail<Presentation>(updateStateHistory(history.undo<Presentation>(stateHistory))))
}

export function redoAction(): void
{
    maybeUpdateState(history.getUndoTail<Presentation>(updateStateHistory(history.redo<Presentation>(stateHistory))))
}

function updateStateHistory(newInstance: StateHistory<Presentation>): StateHistory<Presentation>
{
    return stateHistory = newInstance
}

function maybeUpdateState(newState: Presentation | undefined): Presentation | undefined
{
    if (newState !== undefined)
    {
        state = newState
    }
    return newState
}