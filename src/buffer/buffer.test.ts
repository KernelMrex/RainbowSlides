import {Presentation, RectangleBlock, Slide} from '../core/types';
import {getBufferElement, setBufferElement} from "./buffer";

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
    test('not copied element', () =>
    {
        setBufferElement(undefined)
        expect(getBufferElement()).toEqual(undefined)
    })
    test('copy selected element', () =>
    {
        setBufferElement(undefined)
        setBufferElement(mockRectangle)

        console.log(getBufferElement())
        expect(getBufferElement()).toEqual(mockRectangle)
        expect(getBufferElement()).toEqual(mockRectangle)
    })
})