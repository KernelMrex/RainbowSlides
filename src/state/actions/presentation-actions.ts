import * as core from '../../core/presentation/presentation';
import { dispatch } from '../state-manager';

export function createPresentation(name: string = 'simple name'): void
{
    dispatch(core.createPresentation, [ name ])
}

export function changePresentationName(name: string): void
{
    dispatch(core.changePresentationName, [ name ])
}
