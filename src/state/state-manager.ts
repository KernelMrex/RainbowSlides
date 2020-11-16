import { Presentation, StateHistory } from '../core/types';
import { createPresentation } from '../core/presentation/presentation';
import * as history from '../core/history/history';
import { Action } from './update-state-actions';

type StateType = Presentation
const initialState: StateType = createPresentation();

let state: StateType = initialState;
let stateHistory: StateHistory<StateType> = history.newHistory<StateType>()

export function dispatch<PayloadType>(action: Action, payload?: PayloadType): void
{
    let newState: StateType | undefined;

    if (action.provideCurrentState)
    {
        newState = action(state, payload)
    }
    else
    {
        newState = action(payload)
    }

    if (action.isBeingSaved && newState)
    {
        history.add<StateType>(stateHistory, newState)
    }

    if (newState)
    {
        state = newState
    }
}

export function getState(): StateType
{
    return { ...state }
}

export function setState(newState: StateType): void
{
    state = { ...newState }
}