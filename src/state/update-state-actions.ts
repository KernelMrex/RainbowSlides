export interface UpdateStateAction extends Function
{
    provideCurrentState: boolean,
    isBeingSaved: boolean,
}

export function createUpdateStateAction(fn: Function, isBeingSaved: boolean = false, provideCurrentState: boolean = false): UpdateStateAction
{
    const historyFn: UpdateStateAction = fn as UpdateStateAction
    historyFn.isBeingSaved = isBeingSaved
    historyFn.provideCurrentState = provideCurrentState
    return historyFn
}