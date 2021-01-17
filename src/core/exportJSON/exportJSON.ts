import {Presentation} from "../types";
import { getJSONOfPresentation } from "../presentation/presentation";

export default function downloadPresentation(data: Presentation) {
    const content: string = getJSONOfPresentation(data)
    const urlContent: string = 'data:text/json;charset=utf-8,' + encodeURIComponent(content);

    const clickedElement: HTMLElement = document.createElement('a')
    clickedElement.setAttribute('href', urlContent);
    clickedElement.setAttribute('download', data.name + '.json');

    clickedElement.click();
    clickedElement.remove();
}