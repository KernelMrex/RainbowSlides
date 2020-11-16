import { StateHistory } from '../types'
import { immutablePop, immutablePush } from '../../common/immutable/array';

export function newHistory<StateType>(): StateHistory<StateType>
{
    return {
        undo: [],
        redo: []
    }
}

export function add<StateType>(history: StateHistory<StateType>, state: StateType): StateHistory<StateType>
{
    return { ...history, undo: [ ...history.undo, state ] }
}

export function undo<StateType>(history: StateHistory<StateType>): StateHistory<StateType>
{
    const [ updatedUndo, change ] = immutablePop<StateType>(history.undo)

    return {
        undo: updatedUndo,
        redo: immutablePush<StateType>(history.redo, change),
    }
}

export function redo<StateType>(history: StateHistory<StateType>): StateHistory<StateType>
{
    const [ updatedRedo, change ] = immutablePop<StateType>(history.redo)

    return {
        redo: updatedRedo,
        undo: immutablePush<StateType>(history.undo, change),
    }
}

export function getUndoTail<StateType>(history: StateHistory<StateType>): StateType | undefined
{
    return { ...history.undo.slice(-1, 1)[0] }
}

export function getRedoTail<StateType>(history: StateHistory<StateType>): StateType | undefined
{
    return { ...history.redo.slice(-1, 1)[0] }
}
