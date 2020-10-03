type ActionHistory = {
    undoStack: Array<Presentation>
    redoStack: Array<Presentation>
};

type Presentation = {
    name: string,
    slides: Array<Slide>,
    selection: {
        slide: string | null,
        object: Array<SlidesObject> | null
    }
};

type Slide = {
    id: string,
    objects: Array<SlidesObject>,
    background: Background
};

type Background = {
    type: "picture" | "color",
    background: string
}

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
    decor: Decoration
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

type Decoration = {
    fontFamily: string,
    color: string,
    fontSize: number
};

type Anchors = {
    x: number,
    y: number
};
