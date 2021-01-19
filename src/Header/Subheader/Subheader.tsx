import React from 'react'
import { connect } from 'react-redux'
import { getPayloadForAddObject } from '../../common/createPayloads'
import { Slide, SlideObject } from '../../core/types'
import { importBackgroundImagePopup, importImagePopup } from '../../store/popup/actions'
import {
    addObject,
    addSlide,
    changeColor,
    changeColorSlide,
    deleteSlide,
    downItem,
    removeColor,
    upItem,
    undo,
    redo,
    changeTextSize,
    changeTextColor,
    changeTextFamily,
} from '../../store/presentation/actions'
import { RootState } from '../../store/store'
import Counter from './Counter/Counter'
import './Subheader.css'
import Tool from './Tool/Tool'
import ToolInput from './Tool/ToolInput'

const mapState = (state: RootState) => ({
    selectedSlideId: state.presentation.presentation.selection.slide,
    slides: state.presentation.presentation.slides,
    selectedObjectId: state.presentation.presentation.selection.objects,
})

const mapDispatch = {
    addSlide: addSlide,
    deleteSlide: deleteSlide,
    addObject: addObject,
    importImage: importImagePopup,
    changeColor: changeColor,
    changeColorSlide: changeColorSlide,
    removeColor: removeColor,
    upItem: upItem,
    downItem: downItem,
    importImagePopup: importImagePopup,
    importBackgroundImagePopup: importBackgroundImagePopup,
    undo: undo,
    redo: redo,
    changeTextSize: changeTextSize,
    changeTextColor: changeTextColor,
    changeTextFamily: changeTextFamily,
}

type DispatchProps = typeof mapDispatch
type StateProps = ReturnType<typeof mapState>
type SubheaderProps = StateProps & DispatchProps

function Subheader(props: SubheaderProps)
{
    const currentSlide: Slide | undefined = props.slides.find((slide) => slide.id === props.selectedSlideId)
    const currentIndex: number = currentSlide === undefined ? 0 : props.slides.indexOf(currentSlide) + 1
    const selectedObject: SlideObject | undefined = currentSlide?.objects.find((object) => object.id === props.selectedObjectId[0])
    let isImage: boolean = false
    let isFigure: boolean = false
    let isText: boolean = false

    if (selectedObject)
    {
        isFigure = selectedObject.type === 'rectangle' || selectedObject.type === 'circle' || selectedObject.type === 'triangle' || selectedObject.type === 'text'
        isImage = selectedObject.type === 'image'
        isText = selectedObject.type === 'text'
    }

    return (
        <div className={ 'subheader' }>
            <div className={ 'subheader__column subheader__column_content_center' }>
                <Counter current={ currentIndex } max={ props.slides.length }/>
                <Tool content={ 'plus' } onClick={ props.addSlide }/>
                <Tool content={ 'minus' } onClick={ props.deleteSlide }/>
                <Tool content={ 'undo' } onClick={ props.undo }/>
                <Tool content={ 'redo' } onClick={ props.redo }/>
                <ToolInput type={'color'} onClick={ props.changeColorSlide }/>
                <Tool content={ 'slide-bck' } onClick={ props.importBackgroundImagePopup }/>
            </div>
            <div className={ 'subheader__object-tool' }>
                <Tool content={ 'triangle' } onClick={ () => props.addObject(getPayloadForAddObject('triangle')) }/>
                <Tool content={ 'image' } onClick={ props.importImagePopup }/>
                <Tool content={ 'rectangle' } onClick={ () => props.addObject(getPayloadForAddObject('rectangle')) }/>
                <Tool content={ 'text' } onClick={ () => props.addObject(getPayloadForAddObject('text')) }/>
                <Tool content={ 'circle' } onClick={ () => props.addObject(getPayloadForAddObject('circle')) }/>
            </div>
            <div className={ 'subheader__separator-wrapper' }>
                <div className={ 'subheader__separator' }/>
            </div>
            { (isFigure || isImage) &&
            <div className={ 'subheader__figure_tool' }>
                { isFigure &&
                <>
                    <ToolInput type={'color'} onClick={ props.changeColor }/>
                    <Tool content={ 'no-color' } onClick={ props.removeColor }/>
                </>
                }
                <Tool content={ 'item-down' } onClick={ props.downItem }/>
                <Tool content={ 'item-up' } onClick={ props.upItem }/>
                { isText &&
                <>
                    <ToolInput type={ 'color' } onClick={ props.changeTextColor }/>
                    <ToolInput type={ 'select' } content={ 'font-family' } onClick={ props.changeTextFamily } items={['Open Sans', 'Roboto']}/>
                    <ToolInput type={ 'select' } content={ 'font-size' } onClick={ props.changeTextSize } items={[2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 36, 48, 56, 66, 78, 102]}/>
                </>
                }
            </div>
            }
        </div>
    )
}

export default connect(mapState, mapDispatch)(Subheader)