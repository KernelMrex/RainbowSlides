import React, {useState} from 'react';
import * as type from '../core/types';
import {createPresentation, getPresentationFromJSON} from '../core/presentation/presentation';
import {deleteObjectFromSelection, deleteAllObjectsFromSelection, selectObject, getSelectedObjects} from '../core/selection/selection';

export const useModal = () =>
{
    const [isShowing, setIsShowing] = useState(false);

    function toggle()
    {
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggle,
    }
};

export const useChangePresentation = (presentationState: type.Presentation) =>
{
    const [presentation, setNewPresentation] = useState(presentationState);

    function changePresentation(newPresentation: type.Presentation)
    {
        setNewPresentation(newPresentation);
    }

    function changeSelectedPresentation(selectedObject: type.SlideObject, event: any)
    {
        if (event.shiftKey)
        {
            if (getSelectedObjects(presentation).find((object) => object.id === selectedObject.id) !== undefined)
            {
                setNewPresentation(deleteObjectFromSelection(presentation, selectedObject.id))
            } else
            {
                setNewPresentation(selectObject(presentation, selectedObject.id));
            }
        } else
        {
            setNewPresentation(selectObject(deleteAllObjectsFromSelection(presentation), selectedObject.id));
        }
    }

    function removeAllSelectedObjects(event: any)
    {
        if (event.target.tagName === 'DIV')
        {
            setNewPresentation(deleteAllObjectsFromSelection(presentation));
        }
    }

    function downloadPresentation(event: any)
    {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        let newPresentation: type.Presentation = createPresentation();

        fileReader.readAsText(file);
        fileReader.onload = () =>
        {
            const JSONString = fileReader.result;
            if (typeof JSONString === 'string' && JSONString.slice(2, 6) === 'name')
            {
                newPresentation = (getPresentationFromJSON(JSONString));
            }

            changePresentation(newPresentation)
        }
    }

    return {
        presentation,
        changePresentation,
        downloadPresentation,
        changeSelectedPresentation,
        removeAllSelectedObjects
    }
};