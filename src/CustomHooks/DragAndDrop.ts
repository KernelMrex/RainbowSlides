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

let currentItem: any = null;

export const useDragAndDrop = (element: RefObject<HTMLElement>, setModelPos: Function, setViewPos: Function) =>
{
    const dragEnd = (event: MouseEvent) =>
    {
        if (element.current === currentItem)
        {
            setModelPos();
            cursorPosition.old = {x: 0, y: 0}
            event.preventDefault()
            if (element.current) element.current.removeEventListener("mousedown", dragStart);
        }
        state = dragAndDropState.none;
        window.removeEventListener("mousemove", dragProcess);
        window.removeEventListener("mouseup", dragEnd);
    };

    const dragProcess = (event: MouseEvent) =>
    {
        state = dragAndDropState.moving;
        if (element.current === currentItem)
        {
            setViewPos({
                x: event.pageX - cursorPosition.old.x,
                y: event.pageY - cursorPosition.old.y
            });

            cursorPosition.old = {x: event.pageX, y: event.pageY}
        }
    };

    const dragStart = (event: MouseEvent) =>
    {
        if (!event.defaultPrevented)
        {
            currentItem = event.target;
            state = dragAndDropState.start;
            cursorPosition.old = {x: event.pageX, y: event.pageY}
            event.preventDefault()
            event.stopPropagation()
            window.addEventListener("mousemove", dragProcess);
            window.addEventListener("mouseup", dragEnd);
        }
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
