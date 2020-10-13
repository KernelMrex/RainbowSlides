import { addObjectToSlide, removeObjectFromSlide } from './slides-object';

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
    expect(presentation.slides[0].objects).not.toContain(object)
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
    expect(newPresentationInstance.slides[0].objects).not.toContain(object)
})

test('Remove object from slide', () => {
    const object = { ...mockRectangle }
    const presentation: Presentation = {
        ...mockPresentation,
        slides: [
            {
                ...mockSlide,
                objects: [ object ]
            }
        ]
    }

    const newPresentationInstance = removeObjectFromSlide(presentation, 'mock-slide', 'mock-rectangle')
    expect(presentation.slides[0].objects).toContain(object)
    expect(newPresentationInstance.slides[0].objects).not.toContain(object)
})

test('Remove object from not existing slide', () => {
    const object = { ...mockRectangle }
    const presentation: Presentation = {
        ...mockPresentation,
        slides: [
            {
                ...mockSlide,
                objects: [ object ]
            }
        ]
    }

    const newPresentationInstance = removeObjectFromSlide(presentation, 'not-existing-slide', 'mock-rectangle')
    expect(newPresentationInstance).toBe(presentation)
    expect(presentation.slides[0].objects).toContain(object)
    expect(newPresentationInstance.slides[0].objects).toContain(object)
})