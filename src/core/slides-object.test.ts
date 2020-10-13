import { addObjectToSlide, removeObjectFromSlide, changeObjectName, changeObjectPosition } from './slides-object';

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

test('Change object name on selected slide', () => {
    const object = { ...mockRectangle }
    const presentation: Presentation = {
        ...mockPresentation,
        slides: [
            {
                ...mockSlide,
                objects: [ object ]
            }
        ],
        selection: {
            slide: 'mock-slide',
            objects: [ 'mock-rectangle' ]
        }
    }

    const newPresentationInstance = changeObjectName(presentation, 'Changed name')

    expect(newPresentationInstance).not.toBe(presentation)
    expect(newPresentationInstance.slides[0].objects[0].name).toBe('Changed name')
})

test('Change object name on selected slide with multiply objects', () => {
    const firstRectangle = { ...mockRectangle, id: 'mock-rectangle-1' }
    const secondRectangle = { ...mockRectangle, id: 'mock-rectangle-2' }
    const presentation: Presentation = {
        ...mockPresentation,
        slides: [
            {
                ...mockSlide,
                objects: [ firstRectangle, secondRectangle ]
            }
        ],
        selection: {
            slide: 'mock-slide',
            objects: [ 'mock-rectangle-2' ]
        }
    }

    const newPresentationInstance = changeObjectName(presentation, 'Changed name')

    expect(newPresentationInstance).not.toBe(presentation)
    expect(newPresentationInstance.slides[0].objects[1].name).toBe('Changed name')
})

test('Change object name on not existing selected slide', () => {
    const object = { ...mockRectangle }
    const presentation: Presentation = {
        ...mockPresentation,
        slides: [
            {
                ...mockSlide,
                objects: [ object ]
            }
        ],
        selection: {
            slide: 'not-existing-slide',
            objects: [ 'mock-rectangle' ]
        }
    }
    const newPresentationInstance = changeObjectName(presentation, 'Changed name')

    expect(newPresentationInstance).toBe(presentation)
    expect(newPresentationInstance.slides[0].objects[0].name).not.toBe('Changed name')
})

test('Change object position on selected slide', () => {
    const object = { ...mockRectangle }
    const presentation: Presentation = {
        ...mockPresentation,
        slides: [
            {
                ...mockSlide,
                objects: [ object ]
            }
        ],
        selection: {
            slide: 'mock-slide',
            objects: [ 'mock-rectangle' ]
        }
    }
    const newPresentationInstance = changeObjectPosition(presentation, { x: 50, y: 60 })

    expect(newPresentationInstance).not.toBe(presentation)
    expect(newPresentationInstance.slides[0].objects[0].position).toStrictEqual({ x: 50, y: 60 })
})

test('Change object position on selected slide with multiply objects', () => {
    const firstRectangle = { ...mockRectangle, id: 'mock-rectangle-1' }
    const secondRectangle = { ...mockRectangle, id: 'mock-rectangle-2' }
    const presentation: Presentation = {
        ...mockPresentation,
        slides: [
            {
                ...mockSlide,
                objects: [ firstRectangle, secondRectangle ]
            }
        ],
        selection: {
            slide: 'mock-slide',
            objects: [ 'mock-rectangle-2' ]
        }
    }

    const newPresentationInstance = changeObjectPosition(presentation, { x: 50, y: 60 })

    expect(newPresentationInstance).not.toBe(presentation)
    expect(newPresentationInstance.slides[0].objects[1].position).toStrictEqual({ x: 50, y: 60 })
})

test('Change object position on not existing selected slide', () => {
    const object = { ...mockRectangle }
    const presentation: Presentation = {
        ...mockPresentation,
        slides: [
            {
                ...mockSlide,
                objects: [ object ]
            }
        ],
        selection: {
            slide: 'not-existing-slide',
            objects: [ 'mock-rectangle' ]
        }
    }
    const newPresentationInstance = changeObjectPosition(presentation, { x: 50, y: 60 })

    expect(newPresentationInstance).toBe(presentation)
    expect(newPresentationInstance.slides[0].objects[0].position).not.toBe({ x: 50, y: 60 })
})