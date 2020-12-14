import React, {useState, useEffect, RefObject} from 'react';

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

export const useDragAndDrop = (element: RefObject<HTMLElement>, setDeltaPos: Function, setViewPos: Function) =>
{
    const dragEnd = (event: MouseEvent) =>
    {
        setDeltaPos(cursorPosition.old);
        state = dragAndDropState.none;
        cursorPosition.old = {x: 0, y: 0}
    };

    const dragProcess = (event: MouseEvent) =>
    {
        state = dragAndDropState.moving;
        setViewPos({
            x: event.pageX - cursorPosition.old.x,
            y: event.pageY - cursorPosition.old.y
        });

        cursorPosition.old = {x: event.pageX, y: event.pageY}
    };

    const dragStart = (event: MouseEvent) =>
    {
        state = dragAndDropState.start;
        cursorPosition.old = {x: event.pageX, y: event.pageY}
        event.preventDefault()
        window.addEventListener("mousemove", dragProcess);
        window.addEventListener("mouseup", dragEnd);
    };

    useEffect(() =>
    {

        if (element.current)
        {
            const elementRef = element.current;
            if (state === dragAndDropState.none)
            {
                element.current.addEventListener("mousedown", dragStart);
            }
            if (state === dragAndDropState.moving)
            {
                window.addEventListener("mousemove", dragProcess);
                window.addEventListener("mouseup", dragEnd);
            }
            return () =>
            {
                elementRef.removeEventListener("mousedown", dragStart);
                window.removeEventListener("mousemove", dragProcess);
                window.removeEventListener("mouseup", dragEnd);
            }
        }
    }, [dragStart])
}
