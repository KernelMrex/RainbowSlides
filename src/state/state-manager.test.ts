import { dispatch, getState } from './state-manager';
import { addSlide } from '../core/slides/slides';
import { Slide } from '../core/types';

const mockSlide: Slide = {
    id: 'mock-slide',
    background: {
        hex: '#ffffff',
    },
    objects: []
}

describe('test state-manager', () => {
    test('Update state without arguments and inserting in history', () => {
        dispatch(addSlide)
        expect(getState()?.slides.length).toBe(1)
        dispatch(addSlide)
        expect(getState()?.slides.length).toBe(2)
    })

    test('Update state with arguments and inserting in history', () => {
        const newSlide: Slide = { ...mockSlide }
        dispatch(addSlide, [ newSlide ])
        expect(getState()?.slides).toContain(newSlide)
    })
})