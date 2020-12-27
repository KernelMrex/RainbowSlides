export type StateHistory<StateType> = {
    undo: Array<StateType>
    redo: Array<StateType>
}

export type Presentation = {
    name: string
    slides: Array<Slide>
    selection: {
        slide: string | null
        objects: Array<string>
    }
}

export type Slide = {
    id: string
    objects: Array<SlideObject>
    background: Picture | Color
}

export type Picture = {
    source: string
}

export type Color = {
    hex: string
}

export type SlideObject = CircleBlock | RectangleBlock | TriangleBlock | TextBlock | MediaBlock | ImageBlock

export type CommonBlock = {
    id: string
    name: string
    position: Anchor
    height: number
    width: number
    background: Color
}

export type RectangleBlock = CommonBlock & {
    type: 'rectangle'
}

export type CircleBlock = CommonBlock & {
    type: 'circle'
}

export type TriangleBlock = CommonBlock & {
    type: 'triangle'
}

export type TextBlock = CommonBlock & {
    type: 'text'
    content: string
    font: Font
    color: Color
}

export type Font = {
    family: string
    size: number
    weight: number
    style: 'italic' | 'bold' | 'none'
}

export type MediaBlock = CommonBlock & {
    type: 'media'
    mediaType: 'video' | 'gif'
    source: string
}

export type ImageBlock = CommonBlock & {
    source: string
    type: 'image'
}

export type Anchor = {
    x: number
    y: number
}
