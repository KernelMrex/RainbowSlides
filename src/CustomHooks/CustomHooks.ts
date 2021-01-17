import React, {useState, SyntheticEvent} from 'react';
import * as type from '../core/types';
import {createPresentation, getPresentationFromJSON} from '../core/presentation/presentation';
import {
    deleteAllObjectsFromSelection,
    selectObject, getSelectedObjects,
    SelectObjectPayload,
    selectSlide,
    SelectSlidePayload
} from '../core/selection/selection';
import {dispatch, getState, setState} from '../state/state-manager';
import {createAction} from '../state/update-state-actions';
import {PopupState} from '../Popup/PopupState';
import {
    changeObjectPosition,
    ChangeObjectPositionPayload,
    changeObjectSize,
    ChangeObjectSizePayload, ChangeTextContentPayload, changeTextContent,
} from '../core/objects/objects';
import {ChangeOrderOfSlidePayload, changeOrderOfSlide} from '../core/slides/slides';
import {add} from "../core/history/history";

export const useModal = () =>
{
    const [popupState, setNewPopupState] = useState(PopupState.Closed)

    function changeVisabilityPopup(newPopupState: PopupState)
    {
        setNewPopupState(newPopupState)
    }

    return {
        popupState,
        changeVisabilityPopup
    }
}

export const useNewPresentation = () =>
{
    const [presentation, setNewPresentation] = useState(getState())

    function changePresentation(newPresentation: type.Presentation)
    {
        setNewPresentation(newPresentation)
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
        downloadPresentation,
    }
}