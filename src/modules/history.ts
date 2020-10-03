function addChangeToHistory(presentation: Presentation, history: ActionHistory)
{
    history.undoStack.push(presentation);
}

function undoChange(presentation: Presentation, history: ActionHistory): Presentation | undefined
{
    history.redoStack.push(presentation);

    return history.undoStack.pop();
}

function redoChange(history: ActionHistory)
{
    return history.redoStack.pop()
}