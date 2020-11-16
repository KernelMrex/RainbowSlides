import { dispatch, getState, setState } from './state-manager';
import { Presentation, RectangleBlock, Slide } from '../core/types';
import { addObjectToSlide, AddObjectToSlidePayload } from '../core/objects/objects';
import { createAction } from './update-state-actions';

const mockPresentation: Presentation = {
    name: 'mock-presentation',
    selection: {
        objects: [],
        slide: null
    },
    slides: []
}

const mockSlide: Slide = {
    id: 'mock-slide',
    background: {
        hex: '#ffffff',
    },
    objects: []
}

const mockRectangle: RectangleBlock = {
    type: 'rectangle',
    height: 50,
    id: 'mock-rectangle',
    name: 'Mock Rectangle 1',
    position: { x: 100, y: 200 },
    width: 100
}

describe('test state-manager', () => {
    test('Update state with state provided and inserting in history', () => {
        setState({
            ...mockPresentation,
            slides: [
                mockSlide
            ]
        })

        dispatch<AddObjectToSlidePayload>(
            createAction(addObjectToSlide, true, true),
            {
                slideID: 'mock-slide',
                object: mockRectangle,
            }
        )

        expect(getState().slides.length).toBe(1)
        expect(getState().slides).toStrictEqual([
            {
                ...mockSlide,
                objects: [
                    mockRectangle
                ]
            }
        ])
    })
})