import { StateHistory, Presentation } from '../core/types';
import { createPresentation } from '../core/presentation/presentation';
import * as history from '../core/history/history';
import { UpdateStateAction } from './update-state-actions';

type StateType = Presentation
const initialState: StateType = createPresentation();

let state: StateType = initialState;
let stateHistory: StateHistory<StateType> = history.newHistory<StateType>()

export function dispatch(func: UpdateStateAction, payload: any[] = []): void
{
    const action: UpdateStateAction = func.provideCurrentState ? func.bind(null, state, ...payload) : func.bind(null, ...payload);
    const newState = action()

    if (action.isBeingSaved)
    {
        history.add<StateType>(stateHistory, newState)
    }
}

export function getState(): Presentation
{
    return { ...state }
}