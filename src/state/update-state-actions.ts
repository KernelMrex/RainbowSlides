export interface Action extends Function
{
    provideCurrentState: boolean,
    isBeingSaved: boolean,
}

export function createAction(fn: Function, isBeingSaved: boolean = false, provideCurrentState: boolean = false): Action
{
    const historyFn: Action = fn as Action
    historyFn.isBeingSaved = isBeingSaved
    historyFn.provideCurrentState = provideCurrentState
    return historyFn
}