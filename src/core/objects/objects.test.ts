import {
    addObjectToSlide,
    changeMediaSource,
    changeObjectName,
    changeObjectPosition,
    changeObjectSize,
    changeTextContent,
    changeTextFont,
    removeObjectFromSlide
} from './objects'

import { MediaBlock, Presentation, RectangleBlock, Slide, TextBlock } from '../types'

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
    height: 40,
    background: { hex: '#000000' },
}

const mockTextBlock: TextBlock = {
    id: 'mock-text',
    name: 'Mock text block',
    position: { x: 10, y: 20 },
    type: 'text',
    width: 30,
    height: 40,
    font: {
        family: 'test-font-family',
        size: 18,
        weight: 400,
        style: 'none'
    },
    content: 'Mock text block content',
    color: { hex: '#ffffff' },
    background: { hex: '#000000' },
}

const mockMediaBlock: MediaBlock = {
    id: 'mock-media',
    name: 'Mock media block',
    position: { x: 10, y: 20 },
    type: 'media',
    width: 30,
    height: 40,
    mediaType: 'video',
    source: 'test-source',
    background: { hex: '#000000' },
}

describe('test module "Slide Object"', () => {
    test('Add object to slide', () => {
        const presentation: Presentation = {
            ...mockPresentation,
            slides: [
                { ...mockSlide }
            ]
        }
        const object = { ...mockRectangle }
        const newPresentationInstance = addObjectToSlide(presentation, { slideID: 'mock-slide', object: object })
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
        const newPresentationInstance = addObjectToSlide(presentation, { slideID: 'no-existing-slide', object: object })
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

        const newPresentationInstance = removeObjectFromSlide(presentation, {
            slideID: 'mock-slide',
            objectID: 'mock-rectangle'
        })
        expect(presentation.slides[0].objects).toContain(object)
        expect(newPresentationInstance.slides[0].objects).not.toContain(object)
        expect(newPresentationInstance.selection.objects).not.toContain('mock-rectangle')
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

        const newPresentationInstance = removeObjectFromSlide(presentation, {
            slideID: 'not-existing-slide',
            objectID: 'mock-rectangle'
        })
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

        const newPresentationInstance = changeObjectName(presentation, { newName: 'Changed name' })

        expect(newPresentationInstance).not.toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].name).toBe('Changed name')
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
        const newPresentationInstance = changeObjectName(presentation, { newName: 'Changed name' })

        expect(newPresentationInstance).toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].name).not.toBe('Changed name')
    })

    test('Change not existing object name on selected slide', () => {
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
                objects: [ 'not-existing-object' ]
            }
        }

        const newPresentationInstance = changeObjectName(presentation, { newName: 'Changed name' })

        expect(newPresentationInstance).toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].name).toBe(presentation.slides[0].objects[0].name)
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
        const newPresentationInstance = changeObjectPosition(presentation, { newPosition: { x: 50, y: 60 } })

        expect(newPresentationInstance).not.toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].position).toStrictEqual({ x: 50, y: 60 })
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
        const newPresentationInstance = changeObjectPosition(presentation, { newPosition: { x: 50, y: 60 } })

        expect(newPresentationInstance).toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].position).not.toBe({ x: 50, y: 60 })
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
                objects: [ 'not-existing-object' ]
            }
        }
        const newPresentationInstance = changeObjectPosition(presentation, { newPosition: { x: 50, y: 60 } })

        expect(newPresentationInstance).toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].position).not.toStrictEqual({ x: 50, y: 60 })
    })


    test('Change text-object font on selected slide', () => {
        const object = { ...mockTextBlock }
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
                objects: [ 'mock-text' ]
            }
        }

        const newPresentationInstance = changeTextFont(presentation, {
            newFont: {
                family: 'changed-font-family',
                size: 50,
                style: 'italic',
                weight: 300
            }
        })

        if (!('font' in newPresentationInstance.slides[0].objects[0]))
        {
            fail('property "font" does not found')
        }

        expect(newPresentationInstance).not.toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].font).toStrictEqual({
            family: 'changed-font-family',
            size: 50,
            style: 'italic',
            weight: 300
        })
    })

    test('Change text-object font on not existing slide', () => {
        const object = { ...mockTextBlock }
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
                objects: [ 'mock-text' ]
            }
        }

        const newPresentationInstance = changeTextFont(presentation, {
            newFont: {
                family: 'changed-font-family',
                size: 50,
                style: 'italic',
                weight: 300
            }
        })

        if (!('font' in newPresentationInstance.slides[0].objects[0]))
        {
            fail('property "font" does not found')
        }

        expect(newPresentationInstance).toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].font).not.toStrictEqual({
            family: 'changed-font-family',
            size: 50,
            style: 'italic',
            weight: 300
        })
    })

    test('Change not existing text-object font on slide', () => {
        const object = { ...mockTextBlock }
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
                objects: [ 'not-existing-object' ]
            }
        }

        const newPresentationInstance = changeTextFont(presentation, {
            newFont: {
                family: 'changed-font-family',
                size: 50,
                style: 'italic',
                weight: 300
            }
        })

        if (!('font' in newPresentationInstance.slides[0].objects[0]))
        {
            fail('property "font" does not found')
        }

        expect(newPresentationInstance).toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].font).not.toStrictEqual({
            family: 'changed-font-family',
            size: 50,
            style: 'italic',
            weight: 300
        })
    })

    test('Change not text-object font on slide', () => {
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

        const newPresentationInstance = changeTextFont(presentation, {
            newFont: {
                family: 'changed-font-family',
                size: 50,
                style: 'italic',
                weight: 300
            }
        })

        expect(newPresentationInstance).toBe(presentation)
        if ('font' in newPresentationInstance.slides[0].objects[0])
        {
            fail('property "font" must be not found')
        }
    })


    test('Change text-object content on selected slide', () => {
        const object = { ...mockTextBlock }
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
                objects: [ 'mock-text' ]
            }
        }

        const newPresentationInstance = changeTextContent(presentation, { newContent: 'Changed text' })

        if (!('content' in newPresentationInstance.slides[0].objects[0]))
        {
            fail('property "content" does not found')
        }

        expect(newPresentationInstance).not.toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].content).toBe('Changed text')
    })

    test('Change text-object content on not existing slide', () => {
        const object = { ...mockTextBlock }
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
                objects: [ 'mock-text' ]
            }
        }

        const newPresentationInstance = changeTextContent(presentation, { newContent: 'Changed text' })

        if (!('content' in newPresentationInstance.slides[0].objects[0]))
        {
            fail('property "content" does not found')
        }

        expect(newPresentationInstance).toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].content).not.toBe('Changed text')
    })

    test('Change not existing text-object content on selected slide', () => {
        const object = { ...mockTextBlock }
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
                objects: [ 'not-existing-object' ]
            }
        }

        const newPresentationInstance = changeTextContent(presentation, { newContent: 'Changed text' })

        if (!('content' in newPresentationInstance.slides[0].objects[0]))
        {
            fail('property "content" does not found')
        }

        expect(newPresentationInstance).toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].content).not.toBe('Changed text')
    })

    test('Change not text-object content on selected slide', () => {
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

        const newPresentationInstance = changeTextContent(presentation, { newContent: 'Changed text' })

        expect(newPresentationInstance).toBe(presentation)
        if ('content' in newPresentationInstance.slides[0].objects[0])
        {
            fail('property "content" must not be found')
        }
    })


    test('Change media-object source on selected slide', () => {
        const object = { ...mockMediaBlock }
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
                objects: [ 'mock-media' ]
            }
        }

        const newPresentationInstance = changeMediaSource(presentation, { newSource: 'changed source' })

        if (!('source' in newPresentationInstance.slides[0].objects[0]))
        {
            fail('property "font" does not found')
        }

        expect(newPresentationInstance).not.toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].source).toBe('changed source')
    })

    test('Change media-object source on not existing slide', () => {
        const object = { ...mockMediaBlock }
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
                objects: [ 'mock-media' ]
            }
        }

        const newPresentationInstance = changeMediaSource(presentation, { newSource: 'changed source' })

        if (!('source' in newPresentationInstance.slides[0].objects[0]))
        {
            fail('property "font" does not found')
        }

        expect(newPresentationInstance).toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].source).not.toBe('changed source')
    })

    test('Change not existing media-object source on selected slide', () => {
        const object = { ...mockMediaBlock }
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
                objects: [ 'not-existing-media-object' ]
            }
        }

        const newPresentationInstance = changeMediaSource(presentation, { newSource: 'changed source' })

        if (!('source' in newPresentationInstance.slides[0].objects[0]))
        {
            fail('property "font" does not found')
        }

        expect(newPresentationInstance).toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].source).not.toBe('changed source')
    })

    test('Change not media-object source on selected slide', () => {
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

        const newPresentationInstance = changeMediaSource(presentation, { newSource: 'changed source' })

        expect(newPresentationInstance).toBe(presentation)
        if ('source' in newPresentationInstance.slides[0].objects[0])
        {
            fail('property "source" must be not found')
        }
    })


    test('Change object size(height, width) on selected slide', () => {
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

        const newPresentationInstance = changeObjectSize(presentation, { newWidth: 100, newHeight: 200 })

        expect(newPresentationInstance).not.toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].width).toBe(100)
        expect(newPresentationInstance.slides[0].objects[0].height).toBe(200)
    })

    test('Change object size(height) on selected slide', () => {
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

        const newPresentationInstance = changeObjectSize(presentation, { newWidth: null, newHeight: 200 })

        expect(newPresentationInstance).not.toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].width).toBe(object.width)
        expect(newPresentationInstance.slides[0].objects[0].height).toBe(200)
    })

    test('Change object size(height) on selected slide', () => {
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

        const newPresentationInstance = changeObjectSize(presentation, { newWidth: 100, newHeight: null })

        expect(newPresentationInstance).not.toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].width).toBe(100)
        expect(newPresentationInstance.slides[0].objects[0].height).toBe(object.height)
    })

    test('Change object size on not existing slide', () => {
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

        const newPresentationInstance = changeObjectSize(presentation, { newWidth: 100, newHeight: 200 })

        expect(newPresentationInstance).toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].width).not.toBe(100)
        expect(newPresentationInstance.slides[0].objects[0].height).not.toBe(200)
    })

    test('Change not existing object size on selected slide', () => {
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
                objects: [ 'not-existing-object' ]
            }
        }

        const newPresentationInstance = changeObjectSize(presentation, { newWidth: 100, newHeight: 200 })

        expect(newPresentationInstance).toBe(presentation)
        expect(newPresentationInstance.slides[0].objects[0].width).not.toBe(100)
        expect(newPresentationInstance.slides[0].objects[0].height).not.toBe(200)
    })
})