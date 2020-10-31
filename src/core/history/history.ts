import { Presentation, ActionHistory } from '../types'

const history: ActionHistory = {
    redo: [],
    undo: []
}

export function add(presentation: Presentation): void
{
    history.undo.push(presentation)
}

export function undo(): Presentation | undefined
{
    const change: Presentation | undefined = history.undo.pop()

    if (change !== undefined)
    {
        history.redo.push(change)
    }

    return change
}

export function redo(): Presentation | undefined
{
    return history.redo.pop()
}

export function clearHistory(): void
{
    [history.redo, history.undo].forEach(() => [])
}
