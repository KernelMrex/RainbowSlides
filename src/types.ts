type App = {
    presentation: Presentation,
    history: {
        undoStack: Array<Action>
        redoStack: Array<Action>
    }
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

type Action = {
    previous: Presentation
};

type SlidesObject = Circle | Square | TextBlock | AnimationBlock | Image;

type ShapedObject = {
    id: string,
    type: ObjectsType,
    name: string,
    position: Pointers,
    background: string
};

type Circle = ShapedObject & {
    radius: number,
};

type Square = ShapedObject & {
    size: Size,
};

type TextBlock = ShapedObject & {
    size: Size,
    decor: Decor
};

type AnimationBlock = ShapedObject & {
    size: Size,
    src: string
};

type Image = ShapedObject & {
    size: Size,
    src: string
};

type ObjectsType = "square" | "text" | "circle" | "animation" | "image";

type Decor = {
    font: string,
    color: string,
    fontSize: number
};

type Size = {
    height: number,
    width: number
}

type Pointers = {
    x: number,
    y: number
};
