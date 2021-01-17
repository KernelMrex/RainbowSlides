import React, {useState, useEffect, RefObject} from 'react'
import {strictEqual} from "assert";

enum dragAndDropState
{
    none,
    start,
    moving,
}

let state: dragAndDropState = dragAndDropState.none

let currentItem: string = ''

export const useDragAndDropFake = (element: RefObject<HTMLDivElement>, setModelPos: Function, setViewPos: Function, currentId: string) =>
{
    const dragEnd = (event: MouseEvent) =>
    {
        if (state === dragAndDropState.moving)
        {
            setModelPos(((event.target as HTMLElement).offsetHeight / 2 - event.offsetY > 0) ? 'top' : 'bottom')
        }
        if (element.current) element.current.removeEventListener("mousedown", dragStart);

        state = dragAndDropState.none
        window.removeEventListener("mousemove", dragProcess)
        window.removeEventListener("mouseover", checkCurrentPosition)
        window.removeEventListener("mouseup", dragEnd)
    }

    const dragProcess = (event: MouseEvent) =>
    {
        if (state !== dragAndDropState.none)
        {
            state = dragAndDropState.moving
            if (event.target && currentItem !== '')
            {
                setViewPos({
                    id: currentItem,
                    position: ((event.target as HTMLElement).offsetHeight / 2 - event.offsetY > 0) ? 'top' : 'bottom'
                })
            }
        }
    }

    const checkCurrentPosition = (event: MouseEvent) =>
    {
        if (state === dragAndDropState.moving && (event.target as Element).id && (event.target as Element).id !== currentItem)
        {
            currentItem = (event.target as Element).id
        }
    }

    const dragStart = (event: MouseEvent) =>
    {
        if (!event.defaultPrevented && (event.target as Element).id === currentId)
        {
            currentItem = (event.target as Element).id
            state = dragAndDropState.start
            event.preventDefault()
            event.stopPropagation()
            window.addEventListener("mousemove", dragProcess)
            window.addEventListener("mouseover", checkCurrentPosition)
            window.addEventListener("mouseup", dragEnd)
        }
    }

    useEffect(() =>
    {
        if (element.current)
        {
            const elementRef = element.current
            if (state === dragAndDropState.none)
            {
                elementRef.addEventListener("mousedown", dragStart)
            }
            if (state === dragAndDropState.moving)
            {
                elementRef.addEventListener("mousedown", dragStart)
                window.addEventListener("mousemove", dragProcess)
                window.addEventListener("mouseup", dragEnd)
                window.addEventListener("mouseover", checkCurrentPosition)
            }
            return () =>
            {
                elementRef.removeEventListener("mousedown", dragStart)
                window.removeEventListener("mousemove", dragProcess)
                window.removeEventListener("mouseup", dragEnd)
                window.removeEventListener("mouseover", checkCurrentPosition)
            }
        }
    }, [dragStart])
}
