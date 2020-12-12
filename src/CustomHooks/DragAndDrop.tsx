import React, {useState, useEffect} from 'react';

enum dragAndDropState
{
    none,
    start,
    moving,
}

let state: dragAndDropState = dragAndDropState.none;

let cursorPosition = {
    old: {
        x: 0,
        y: 0
    }
}

export const useDragAndDrop = (element: Element | null, setDeltaPos: Function, setViewPos: Function) =>
{
    const dragEnd = (event: any) =>
    {
        setDeltaPos(cursorPosition.old);
        state = dragAndDropState.none;
        cursorPosition.old = {x: 0, y: 0}
    };

    const dragProcess = (event: any) =>
    {
        state = dragAndDropState.moving;
        setViewPos({
            x: event.pageX - cursorPosition.old.x,
            y: event.pageY - cursorPosition.old.y
        });

        cursorPosition.old = {x: event.pageX, y: event.pageY}
    };

    const dragStart = (event: any) =>
    {
        state = dragAndDropState.start;
        cursorPosition.old = {x: event.pageX, y: event.pageY}
        event.preventDefault()
        window.addEventListener("mousemove", dragProcess);
        window.addEventListener("mouseup", dragEnd);
    };

    useEffect(() =>
    {
        if (element)
        {
            if (state === dragAndDropState.none)
            {
                element.addEventListener("mousedown", dragStart);
            }
            if (state === dragAndDropState.moving)
            {
                window.addEventListener("mousemove", dragProcess);
                window.addEventListener("mouseup", dragEnd);
            }
            return () =>
            {
                element.removeEventListener("mousedown", dragStart);
                window.removeEventListener("mousemove", dragProcess);
                window.removeEventListener("mouseup", dragEnd);
            }
        }
    }, [dragStart])
}
