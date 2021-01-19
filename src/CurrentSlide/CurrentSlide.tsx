import React, {useEffect} from 'react';
import * as type from '../core/types';
import style from './CurrentSlide.module.css'
import SlideObject from './SlideObject/SlideObject'
import {connect} from "react-redux";
import {RootState} from "../store/store";
import {
    changeOrderOfSlide,
    unselectObject,
    deleteObject,
    pasteElement,
    undo,
    redo
} from "../store/presentation/actions";
import {copyElement} from "../store/buffer/actions";

const mapState = (state: RootState) => ({
    slideId: state.presentation.presentation.selection.slide,
    slides: state.presentation.presentation.slides,
    selectedObjects: state.presentation.presentation.selection.objects,
    object: state.buffer.object,
})
const mapDispatch = {
    changeOrderOfSlide: changeOrderOfSlide,
    unselectObject: unselectObject,
    deleteObject: deleteObject,
    copyElement: copyElement,
    pasteElement: pasteElement,
    undo: undo,
    redo: redo,
}
type DispatchProps = typeof mapDispatch
type StateProps = ReturnType<typeof mapState>
type CurrentSlideProps = StateProps & DispatchProps

function CurrentSlide(props: CurrentSlideProps)
{
    const currentSlide: type.Slide | undefined = props.slides.find((slide) => slide.id === props.slideId)
    let mapList;
    const selectedObjects: Array<string> | [] = props.selectedObjects;
    let background = '#ffffff';
    let selectedObject: type.SlideObject | undefined = undefined

    if (currentSlide && currentSlide !== undefined && currentSlide.objects !== [])
    {
        mapList = currentSlide.objects.map((slideObjects) =>
            <SlideObject
                key={slideObjects.id}
                object={slideObjects}
                coef={1}
                isSelected={selectedObjects.find((objectID) => objectID === slideObjects.id) !== undefined ? true : false}
                isLock={false}/>
        );

        background = defineBackground(currentSlide.background);
        selectedObject = currentSlide.objects.find((object) => object.id === selectedObjects[0])
    }

    useEffect(() =>
    {
        window.addEventListener('keyup', keydownHandler)

        return () =>
        {
            window.removeEventListener('keyup', keydownHandler)
        }
    }, [selectedObject]);

    return (
        <div className={style.wrapper} onClick={(event) =>
        {
            if (event !== null && (event.target as Element).tagName === 'DIV') props.unselectObject()
        }}>
            <div className={style.content} style={{background: background, backgroundSize: 'cover'}}>
                {currentSlide && (currentSlide !== undefined) && (currentSlide.objects !== []) &&
                mapList
                }
            </div>
        </div>
    )

    function keydownHandler(event: KeyboardEvent): void
    {
        if (event.ctrlKey)
        {
            switch (event.key)
            {
                case 'c':
                    props.copyElement(selectedObject)
                    break;
                case 'v':
                    props.pasteElement(props.object)
                    break;
                case 'z':
                    props.undo()
                    break;
                case 'y':
                    props.redo()
                    break;
            }
        }

        if (event.key === 'Delete')
        {
            event.preventDefault()
            props.deleteObject()
        }
    }
}

function isColor(background: type.Color | type.Picture): background is type.Color
{
    return (background as type.Color).hex !== undefined;
}

function defineBackground(unknownBackground: type.Picture | type.Color): string
{
    let background: string;
    background = isColor(unknownBackground) ? unknownBackground.hex : 'url(\'' + unknownBackground.source + '\')';

    return background;
}

export default connect(mapState, mapDispatch)(CurrentSlide)