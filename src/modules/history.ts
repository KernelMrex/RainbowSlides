function addChangeToHistory(app: App)
{
    app.history.undoStack.push(app.presentation);
}

function undoChange(app: App)
{
    const presentation: Presentation | undefined = app.history.undoStack.pop();
    app.history.redoStack.push(app.presentation);

    return presentation;
}

function redoChange(app: App)
{
    return app.history.redoStack.pop()
}