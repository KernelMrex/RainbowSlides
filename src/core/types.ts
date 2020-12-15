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
    background: Color | Picture
}

export type SlideObject = RectangleBlock | CircleBlock | TriangleBlock | TextBlock | ImageBlock | VideoBlock

type CommonBlock = {
    id: string
    name: string
    position: Anchor
}

type GeometricBlock = CommonBlock & {
    height: number
    width: number
    fill: Color
    stroke?: Stroke
}

export type RectangleBlock = GeometricBlock & {
    type: 'rectangle'
}

export type CircleBlock = GeometricBlock & {
    type: 'circle'
}

export type TriangleBlock = GeometricBlock & {
    type: 'triangle'
}

export type TextBlock = CommonBlock & {
    type: 'text'
    content: string
    font: Font
    color: Color
    width: number
}

export type VideoBlock = CommonBlock & {
    type: 'video'
    sourceType: 'youtube'
    source: string
    width: number
    height: number
}

export type ImageBlock = CommonBlock & Picture & {
    type: 'image'
    width: number
    height: number
}

export type Font = {
    family: string
    size: number
    weight: number
    style: 'italic' | 'bold' | 'none'
}

export type Anchor = {
    x: number
    y: number
}

export type Stroke = {
    style: 'solid' | 'dashed'
    color: Color
}

export type Color = {
    red: number
    green: number
    blue: number
    alpha?: number
}

export type Picture = {
    content: string
    extension: 'jpg' | 'jpeg' | 'png'
}