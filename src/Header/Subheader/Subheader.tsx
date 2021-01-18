import React from 'react'
import Counter from './Counter/Counter';
import './Subheader.css'
import {connect} from "react-redux";
import {RootState} from "../../store/store";
import {Slide, SlideObject} from '../../core/types';
import Tool from './Tool/Tool';
import {addObject, addSlide, deleteSlide, changeColor, changeColorSlide, removeColor} from "../../store/presentation/actions";
import {getPayloadForAddObject} from "../../common/createPayloads";
import {importImagePopup} from "../../store/popup/actions";
import ToolInput from "./Tool/ToolInput";

const mapState = (state: RootState) => ({
    selectedSlideId: state.presentation.selection.slide,
    slides: state.presentation.slides,
    selectedObjectId: state.presentation.selection.objects
})
const mapDispatch = {
    addSlide: addSlide,
    deleteSlide: deleteSlide,
    addObject: addObject,
    importImage: importImagePopup,
    changeColor: changeColor,
    changeColorSlide: changeColorSlide,
    removeColor: removeColor,
}

type DispatchProps = typeof mapDispatch
type StateProps = ReturnType<typeof mapState>
type SubheaderProps = StateProps & DispatchProps

function Subheader(props: SubheaderProps)
{
    const currentSlide: Slide | undefined = props.slides.find((slide) => slide.id === props.selectedSlideId)
    const currentIndex: number = currentSlide === undefined ? 0 : props.slides.indexOf(currentSlide) + 1
    const selectedObject: SlideObject | undefined = currentSlide?.objects.find((object) => object.id === props.selectedObjectId[0])
    let isFigure: boolean = false;

    if (selectedObject)
    {
        isFigure = selectedObject.type === 'rectangle' || selectedObject.type === 'circle' || selectedObject.type === 'triangle' || selectedObject.type === 'text'
    }
    return (
        <div className={'subheader'}>
            <div className={'subheader__column subheader__column_content_center'}>
                <Counter current={currentIndex} max={props.slides.length}/>
                <Tool content={'plus'} onClick={props.addSlide}/>
                <Tool content={'minus'} onClick={props.deleteSlide}/>
                <Tool content={'undo'} onClick={props.deleteSlide}/>
                <Tool content={'redo'} onClick={props.deleteSlide}/>
            </div>
            <div className={'subheader__object-tool'}>
                <Tool content={'triangle'} onClick={(e) => props.addObject(getPayloadForAddObject('triangle'))}/>
                <Tool content={'image'} onClick={(e) => props.addObject(getPayloadForAddObject('triangle'))}/>
                <Tool content={'rectangle'} onClick={(e) => props.addObject(getPayloadForAddObject('rectangle'))}/>
                <Tool content={'text'} onClick={(e) => props.addObject(getPayloadForAddObject('text'))}/>
                <Tool content={'circle'} onClick={(e) => props.addObject(getPayloadForAddObject('circle'))}/>
                <ToolInput content={''} onClick={props.changeColorSlide}/>
            </div>
            {isFigure &&
            <div className={'subheader__figure_tool'}>
                <ToolInput content={''} onClick={props.changeColor}/>
                <Tool content={'no-color'} onClick={props.removeColor}/>
                <Tool content={'color-fill'} onClick={(e) => props.addObject(getPayloadForAddObject('triangle'))}/>
                <Tool content={'paint-brush'} onClick={(e) => props.addObject(getPayloadForAddObject('rectangle'))}/>
            </div>
            }
        </div>
    )
}

export default connect(mapState, mapDispatch)(Subheader)