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

    function changeSlide(newSlide: type.Slide)
    {
        dispatch<SelectSlidePayload>(createAction(selectSlide, false, true), {slide: newSlide})
        setNewPresentation(getState())
    }

    function changeSelectedPresentation(selectedObject: type.SlideObject)
    {
        dispatch<{}>(createAction(deleteAllObjectsFromSelection, true, true), {})
        dispatch<SelectObjectPayload>(createAction(selectObject, true, true), {objectId: selectedObject.id})
        setNewPresentation(getState())
    }

    function removeAllSelectedObjects(event: any)
    {
        if (event !== null && event.target.tagName === 'DIV')
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

    function changePosition(object: type.SlideObject, position: type.Anchor): void
    {
        let selectedObjects: Array<type.SlideObject> = getSelectedObjects(getState());
        if (selectedObjects.length !== 0)
        {
            dispatch<{}>(createAction(deleteAllObjectsFromSelection, true, true), {})
        }
        dispatch<SelectObjectPayload>(createAction(selectObject, true, true), {objectId: object.id})
        dispatch<ChangeObjectPositionPayload>(createAction(changeObjectPosition, true, true), {newPosition: position})

        changePresentation(getState())
    }

    function changeSize(position: type.Anchor, height: number, width: number): void
    {
        dispatch<ChangeObjectSizePayload>(createAction(changeObjectSize, true, true), {
            newPosition: position,
            newHeight: height,
            newWidth: width
        })
        changePresentation(getState())
        changePresentation(getState())
    }

    function changeText(content: string): void
    {
        dispatch<ChangeTextContentPayload>(createAction(changeTextContent, true, true), {newContent: content})
        changePresentation(getState())
    }

    function changeSlidePosition(estimatedSlideId: string, currentSlideId: string, position: 'bottom' | 'top'): void
    {
        const slidesId: Array<string> = getState().slides.map((slide) =>
        {
            return slide.id
        })
        const indexOfEstimatedSlideId: number = slidesId.indexOf(estimatedSlideId)
        const indexOfCurrentSlideId: number = slidesId.indexOf(currentSlideId)

        let additionalCoef: number = 0

        if (indexOfEstimatedSlideId > indexOfCurrentSlideId)
        {
            additionalCoef = position === 'bottom' ? 0 : -1
        }
        if (indexOfEstimatedSlideId < indexOfCurrentSlideId)
        {
            additionalCoef = position === 'bottom' ? 1 : 0
        }
        const newSlidePlacement: number = indexOfEstimatedSlideId + additionalCoef;

        dispatch<ChangeOrderOfSlidePayload>(createAction(changeOrderOfSlide, true, true), {place: newSlidePlacement, currentSlideId: currentSlideId})
        changePresentation(getState())
    }

    return {
        presentation,
        changePresentation,
        downloadPresentation,
        changePosition,
        changeSelectedPresentation,
        removeAllSelectedObjects,
        changeSlide,
        changeSize,
        changeText,
        changeSlidePosition
    }
}