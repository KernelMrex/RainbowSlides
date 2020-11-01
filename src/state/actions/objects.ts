import { Anchor, Font, SlideObject } from '../../core/types';
import { dispatch } from '../state-manager';
import * as core from '../../core/objects/objects';

export function addObject(slideID: string, object: SlideObject): void
{
    dispatch(core.addObjectToSlide, [ slideID, object ])
}

export function removeObjectFromSlide(slideID: string, objectID: string): void
{
    dispatch(core.removeObjectFromSlide, [ slideID, objectID ])
}

export function changeObjectName(newName: string): void
{
    dispatch(core.changeObjectName, [ newName ])
}

export function changeObjectPosition(newPosition: Anchor): void
{
    dispatch(core.changeObjectPosition, [ newPosition ])
}

export function changeTextFont(newFont: Font): void
{
    dispatch(core.changeTextFont, [ newFont ])
}

export function changeTextContent(newContent: string): void
{
    dispatch(core.changeTextContent, [ newContent ])
}

export function changeMediaSource(newSource: string): void
{
    dispatch(core.changeMediaSource, [ newSource ])
}

export function changeObjectSize(newWidth: number | null, newHeight: number | null): void
{
    dispatch(core.changeObjectSize, [ newWidth, newHeight ])
}
