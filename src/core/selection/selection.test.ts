import { selectObject, selectSlide, deleteSlideFromSelection, deleteObjectFromSelection } from './selection'

import { CircleBlock, ImageBlock, Presentation, Slide } from '../types'

const picture: ImageBlock = {
    id: 'f123',
    type: 'image',
    name: 'Sasha',
    position: {
        x: 12,
        y: 23
    },
    height: 213,
    width: 321,
    source: 'url',
    background: {
        hex: '123123'
    }
}

const simpleCircle: CircleBlock = {
    id: 'f124',
    type: 'circle',
    name: 'Sasha',
    position: {
        x: 12,
        y: 23
    },
    height: 213,
    width: 321,
    background: {
        hex: '123123'
    }
}

const slide1: Slide = {
    id: 'f321',
    objects: [ picture, simpleCircle ],
    background: {
        source: 'url'
    }
}

const slide2: Slide = {
    id: 'f421',
    objects: [ picture ],
    background: {
        hex: '#ffffff'
    }
}

const presentationWithoutSelectedSlide: Presentation = {
    name: 'name1',
    slides: [ slide1 ],
    selection: {
        slide: null,
        objects: []
    }
}

const presentationWithoutSelectedObject: Presentation = {
    name: 'name3',
    slides: [ slide1 ],
    selection: {
        slide: slide1.id,
        objects: []
    }
}

const presentationWithSelectedSlide: Presentation = {
    name: 'name2',
    slides: [ slide1, slide2 ],
    selection: {
        slide: slide1.id,
        objects: [ picture.id ]
    }
}

const presentationWithSelectedSlide1: Presentation = {
    name: 'name2',
    slides: [ slide1, slide2 ],
    selection: {
        slide: slide1.id,
        objects: [ picture.id, simpleCircle.id ]
    }
}

const presentationWithSelectedSlide2: Presentation = {
    name: 'name2',
    slides: [ slide1, slide2 ],
    selection: {
        slide: slide1.id,
        objects: [ simpleCircle.id ]
    }
}

describe('test module "Selection"', () => {
    test('select slide without previous', () => {
        let newPresentation: Presentation = selectSlide(presentationWithoutSelectedSlide, {slide: slide1})
        expect(newPresentation).toEqual({
            ...presentationWithoutSelectedSlide,
            selection: {
                slide: slide1.id,
                objects: []
            }
        })
    })

    test('select slide with already selected slide', () => {
        let newPresentation: Presentation = selectSlide(presentationWithSelectedSlide, {slide: slide2})
        expect(newPresentation).toEqual({
            ...presentationWithSelectedSlide,
            selection: {
                slide: slide2.id,
                objects: []
            }
        })
    })

    test('delete slide with selected slide', () => {
        let newPresentation: Presentation = deleteSlideFromSelection(presentationWithSelectedSlide)
        expect(newPresentation).toEqual({
            ...presentationWithSelectedSlide,
            selection: {
                slide: null,
                objects: []
            }
        })
    })

    test('select object without already selected object', () => {
        let selectedSlideId = presentationWithoutSelectedObject.selection.slide
        let selectedSlide: Slide = presentationWithoutSelectedObject.slides.filter(slide => slide.id === selectedSlideId)[0]
        let newSelectedObjectId: string = selectedSlide.objects.filter(object => object.id === simpleCircle.id)[0].id

        let newPresentation: Presentation = selectObject(presentationWithoutSelectedObject, {objectId: newSelectedObjectId})
        expect(newPresentation).toEqual({
            ...presentationWithoutSelectedObject,
            selection: {
                ...presentationWithoutSelectedObject.selection,
                objects: [ newSelectedObjectId ]
            }
        })
    })

    test('select object with already selected object', () => {
        let selectedSlideId: string | null = presentationWithSelectedSlide.selection.slide
        let selectedSlide: Slide = presentationWithSelectedSlide.slides.filter(slide => slide.id === selectedSlideId)[0]
        let newSelectedObjectId: string = selectedSlide.objects.filter(object => object.id === simpleCircle.id)[0].id

        let newPresentation: Presentation = selectObject(presentationWithSelectedSlide, {objectId: newSelectedObjectId})
        expect(newPresentation).toEqual({
            ...presentationWithSelectedSlide,
            selection: {
                ...presentationWithSelectedSlide.selection,
                objects: [ newSelectedObjectId ]
            }
        })
    })

    test('delete last object with already selected object', () => {
        let newPresentation: Presentation = deleteObjectFromSelection(presentationWithSelectedSlide1, {objectId: simpleCircle.id})
        expect(newPresentation).toEqual(presentationWithSelectedSlide)
    })

    test('delete first object with already selected object', () => {
        let newPresentation: Presentation = deleteObjectFromSelection(presentationWithSelectedSlide1, {objectId: picture.id})
        expect(newPresentation).toEqual(presentationWithSelectedSlide2)
    })
})