import React, {useState} from 'react';
import * as type from '../core/types';
import {createPresentation, getPresentationFromJSON} from '../core/presentation/presentation';
import { deleteObjectFromSelection,
    deleteAllObjectsFromSelection,
    selectObject, getSelectedObjects,
    DeleteObjectFromSelectionPayload,
    SelectObjectPayload,
    selectSlide,
    SelectSlidePayload} from '../core/selection/selection';
import { dispatch, getState, setState } from '../state/state-manager';
import { createAction } from '../state/update-state-actions';

export const useModal = () =>
{
    const [isShowing, setIsShowing] = useState(false)

    function toggle()
    {
        setIsShowing(!isShowing)
    }

    return {
        isShowing,
        toggle,
    }
}

export const usePresentationChanges = (presentationState: type.Presentation) =>
{
    const [presentation, setNewPresentation] = useState(presentationState)

    setState(presentation);

    function changePresentation(newPresentation: type.Presentation)
    {
        setNewPresentation(newPresentation)
    }

    function changeSlide(newSlide: type.Slide)
    {
        dispatch<SelectSlidePayload>(createAction(selectSlide, false, true), {slide: newSlide})
        setNewPresentation(getState())
    }

    function changeSelectedPresentation(selectedObject: type.SlideObject, event: any)
    {
        if (event.shiftKey)
        {
            if (getSelectedObjects(presentation).find((object) => object.id === selectedObject.id) !== undefined)
            {
                dispatch<DeleteObjectFromSelectionPayload>(createAction(deleteObjectFromSelection, true, true), {objectId: selectedObject.id})
                setNewPresentation(getState())
            } else
            {
                dispatch<SelectObjectPayload>(createAction(selectObject, true, true), {objectId: selectedObject.id})
                setNewPresentation(getState())
            }
        } else
        {
            dispatch<{}>(createAction(deleteAllObjectsFromSelection, true, true), {})
            dispatch<SelectObjectPayload>(createAction(selectObject, true, true), {objectId: selectedObject.id})
            setNewPresentation(getState())
        }
    }

    function removeAllSelectedObjects(event: any)
    {
        if (event.target.tagName === 'DIV')
        {
            dispatch<{}>(createAction(deleteAllObjectsFromSelection, true, true), {})
            setNewPresentation(getState())
        }
    }

    function downloadPresentation(event: any)
    {
        const file = event.target.files[0]
        const fileReader = new FileReader()
        let newPresentation: type.Presentation = createPresentation({})

        fileReader.readAsText(file)
        fileReader.onload = () =>
        {
            const JSONString = fileReader.result
            if (typeof JSONString === 'string' && JSONString.slice(2, 6) === 'name')
            {
                newPresentation = (getPresentationFromJSON(JSONString))
            }

            changePresentation(newPresentation)
        }
    }

    return {
        presentation,
        downloadPresentation,
        changeSelectedPresentation,
        removeAllSelectedObjects,
        changeSlide
    }
}