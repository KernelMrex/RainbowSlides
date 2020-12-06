import React, {useState, useEffect} from 'react';

enum dragAndDropState
{
    none,
    start,
    moving,
}

let state: dragAndDropState = dragAndDropState.none;

export const useDragAndDrop = (element: Element | null, setDeltaPos: Function) =>
{
    let cursorPosition = {
        new: {
            x: 0,
            y: 0
        },
        old: {
            x: 0,
            y: 0
        }
    }

    const dragEnd = () =>
    {
        let deltaX, deltaY: Number;
        console.log('end');

        if (state === dragAndDropState.moving)
        {
            deltaX = cursorPosition.new.x - cursorPosition.old.x
            deltaY = cursorPosition.new.y - cursorPosition.old.y
        } else
        {
            deltaX = 0
            deltaY = 0
        }

        setDeltaPos({
            x: deltaX,
            y: deltaY
        });

        state = dragAndDropState.none;
    };

    const dragProcess = (event: any) =>
    {
        console.log('moving');
        state = dragAndDropState.moving;
        cursorPosition.new = {x: event.pageX, y: event.pageY};
    };

    const dragStart = (event: any) =>
    {
        console.log('start');
        state = dragAndDropState.start;
        cursorPosition.old = {x: event.pageX, y: event.pageY}
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
            return () =>
            {
                element.removeEventListener("mousedown", dragStart);
                window.removeEventListener("mousemove", dragProcess);
                window.removeEventListener("mouseup", dragEnd);
            }
        }
    }, [dragStart])
}
