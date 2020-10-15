type ActionHistory = {
    undo: Array<Presentation>
    redo: Array<Presentation>
}

type Presentation = {
    name: string
    slides: Array<Slide>
    selection: {
        slide: string | null
        objects: Array<string>
    }
}

type Slide = {
    id: string
    objects: Array<SlideObject>
    background: Picture | Color
}

type Picture = {
    source: string
}

type Color = {
    hex: string
}

type SlideObject = CircleBlock | RectangleBlock | TextBlock | MediaBlock | ImageBlock

type RectangleBlock = {
    id: string
    type: ObjectType
    name: string
    position: Anchor
    height: number
    width: number
}

type CircleBlock = RectangleBlock & {
    radius: number
}

type TextBlock = RectangleBlock & {
    content: string
    font: Font
    color: Color
}

type Font = {
    family: string
    size: number
    weight: number
    style: 'italic' | 'bold' | 'none'
}

type MediaBlock = RectangleBlock & {
    mediaType: 'video' | 'gif'
    source: string
}

type ImageBlock = RectangleBlock & {
    source: string
}

type ObjectType = 'rectangle' | 'text' | 'circle' | 'media' | 'image'

type Anchor = {
    x: number
    y: number
}
