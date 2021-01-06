import {Presentation, RectangleBlock, Slide} from '../core/types';
import {setBufferElement} from "./buffer";

const mockRectangle: RectangleBlock = {
    type: 'rectangle',
    height: 50,
    id: 'rectangle',
    name: 'Rectangle 1',
    position: {x: 100, y: 200},
    width: 100,
    background: {
        hex: '#123112'
    }
}

const mockSlide: Slide = {
    id: 'slide',
    background: {
        hex: '#ffffff',
    },
    objects: [mockRectangle]
}

const mockPresentation: Presentation = {
    name: 'presentation',
    selection: {
        objects: [],
        slide: null
    },
    slides: [mockSlide]
}

describe('test buffer for copy and paste elements', () =>
{
    test('copy non selected element', () =>
    {
        setBufferElement(null)

        console.log(mockPresentation.selection.objects[0])
    })
})