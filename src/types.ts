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
        object: SlidesObject | null
    }
};

type Slide = {
    id: string,
    objects: Array<SlidesObject>,
    background: string
};

type SlidesObject = Circle | Square | TextBlock | AnimationBlock | Image;

type ShapedObject = {
    id: string,
    type: ObjectsType,
    name: string,
    position: Anchors,
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

type ObjectsType = "square" | "text" | "circle" | "animation" | "image";

type Decor = {
    font: string,
    color: string,
    fontSize: number
};

type Anchors = {
    x: number,
    y: number
};
