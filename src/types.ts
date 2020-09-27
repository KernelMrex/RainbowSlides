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