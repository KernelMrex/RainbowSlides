function addChangeToHistory(presentation: Presentation, history: ActionHistory)
{
    history.undo.push(presentation);
}

function undoChange(presentation: Presentation, history: ActionHistory): Presentation | undefined
{
    history.redo.push(presentation);

    return history.undo.pop();
}

function redoChange(history: ActionHistory)
{
    return history.redo.pop()
}