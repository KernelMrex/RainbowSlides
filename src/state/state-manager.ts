import { Presentation } from '../core/types';
import * as history from '../core/history/history';
import { createPresentation } from '../core/presentation/presentation';

let state: Presentation | undefined

export function dispatch(func: CallableFunction, payload: any = []): Presentation
{
    if (state === undefined)
    {
        state = createPresentation()
    }

    const newState: Presentation = func(state, ...payload)
    history.add(newState)
    return { ...(state = newState) }
}

export function clear(): void
{
    history.clearHistory()
    state = undefined
}

export function getState(): Presentation | undefined
{
    return state ? { ...state } : undefined;
}
