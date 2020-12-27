import * as type from "../../../../../core/types";
import {PhysicalParams, Size} from "./HOCDots";

export function createParamsToModel(newPos: type.Anchor, object: type.SlideObject, type: string): PhysicalParams
{
    let physicalParams: PhysicalParams = {pos: {x: 0, y: 0}, size: {height: 0, width: 0}};
    if (type === 'topLeft')
    {
        physicalParams = {
            pos: {x: object.position.x + newPos.x, y: object.position.y + newPos.y},
            size: {
                height: object.height - newPos.y,
                width: object.width - newPos.x
            }
        }
    }

    return physicalParams
}

export function createPosition(newPos: type.Anchor, object: type.SlideObject, type: string): type.Anchor
{
    return {
        x: object.position.x + newPos.x, y: object.position.y + newPos.y
    }
}

export function createSize(newPos: type.Anchor, object: type.SlideObject, type: string): Size
{
    return {
        height: object.height - newPos.y,
        width: object.width - newPos.x
    }
}