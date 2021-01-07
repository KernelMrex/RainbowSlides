import {dispatch, getState} from "../state/state-manager";
import {copyElement, CopyElementPayload, pasteElement} from "../core/objects/objects";
import {createAction} from "../state/update-state-actions";
import {getSelectedObjects, selectSlide} from "../core/selection/selection";
import {Presentation} from "../core/types";
import {getBufferElement} from "../buffer/buffer";

export function bindKeys(): void
{
    window.addEventListener('keydown', keydownHandler)
    console.log('s')
    function keydownHandler(event: KeyboardEvent): void
    {
        if (event.ctrlKey)
        {
            switch (event.key)
            {
                case 'c':
                    dispatch<CopyElementPayload>(createAction(copyElement, false, true), {copiedElement: getSelectedObjects(getState())[0]})
                    console.log(getBufferElement())
                    break;
                case 'v':
                    dispatch<{}>(createAction(pasteElement, true, true), {})
                    console.log(getState())
                    //changePresentation(getState())
                    break;
            }
        }
    }
}