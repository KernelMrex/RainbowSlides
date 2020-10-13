import { addObjectToSlide } from './slides-object';

const mockPresentation: Presentation = {
    name: 'Mock presentation',
    slides: [],
    selection: {
        objects: [],
        slide: null
    }
}

const mockSlide: Slide = {
    id: 'mock-slide',
    background: {
        hex: '#ffffff',
    },
    objects: []
}

const mockRectangle: RectangleBlock = {
    id: 'mock-rectangle',
    name: 'Mock rectangle',
    position: { x: 10, y: 20 },
    type: 'rectangle',
    width: 30,
    height: 40
}

test('Add object to slide', () => {
    const presentation: Presentation = {
        ...mockPresentation,
        slides: [
            { ...mockSlide }
        ]
    }
    const object = { ...mockRectangle }
    const newPresentationInstance = addObjectToSlide(presentation, 'mock-slide', object)
    expect(newPresentationInstance).not.toBe(presentation)
    expect(newPresentationInstance.slides[0].objects).toContain(object)
})

test('Add object to not existing slide', () => {
    const presentation: Presentation = {
        ...mockPresentation,
        slides: [
            { ...mockSlide }
        ]
    }
    const object = { ...mockRectangle }
    const newPresentationInstance = addObjectToSlide(presentation, 'no-existing-slide', object)
    expect(newPresentationInstance).toBe(presentation)
})
