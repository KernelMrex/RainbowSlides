type App = {
    presentation: Presentation,
    history: ActionHistory
};

type ActionHistory = {
    undoStack: Array<Presentation>
    redoStack: Array<Presentation>
};

type Presentation = {
    name: string,
    slides: Array<Slide>,
    selection: {
        slide: Slide | null,
        object: SlideObject | null
    }
};

type Slide = {
    id: string,
    objects: Array<SlideObject>,
    background: string
};

type SlideObject = Circle | Square | TextBlock | AnimationBlock | Image;

type ShapedObject = {
    id: string,
    type: ObjectType,
    name: string,
    position: Anchor,
    background: string
};

type Circle = ShapedObject & {
    radius: number,
};

type Square = ShapedObject & {
    height: number,
    width: number
};

type TextBlock = ShapedObject & {
    height: number,
    width: number,
    decor: Decor
};

type AnimationBlock = ShapedObject & {
    height: number,
    width: number,
    src: string
};

type Image = ShapedObject & {
    height: number,
    width: number,
    src: string
};

type ObjectType = "square" | "text" | "circle" | "animation" | "image";

type Decor = {
    font: string,
    color: string,
    fontSize: number
};

type Anchor = {
    x: number,
    y: number
};
