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

export type SlideObject = CircleBlock | RectangleBlock | TextBlock | MediaBlock | ImageBlock

export type RectangleBlock = {
    id: string
    type: ObjectType
    name: string
    position: Anchor
    height: number
    width: number
}

export type CircleBlock = RectangleBlock

export type TextBlock = RectangleBlock & {
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

export type MediaBlock = RectangleBlock & {
    mediaType: 'video' | 'gif'
    source: string
}

export type ImageBlock = RectangleBlock & {
    source: string
}

export type ObjectType = 'rectangle' | 'text' | 'circle' | 'media' | 'image'

export type Anchor = {
    x: number
    y: number
}
