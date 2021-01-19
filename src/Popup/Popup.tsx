import React from 'react';
import style from './Popup.module.css'
import * as type from '../core/types';
import {createPresentation} from '../core/presentation/presentation';
import ImportPresentation from './ImportPresentation/ImportPresentation';
import {RootState} from "../store/store";
import {closePopup} from "../store/popup/actions";
import {connect} from "react-redux";
import { downloadPresentation, addImage, addBackgroundImage } from '../store/presentation/actions';
import ImportImage from './ImportImage/ImportImage';

const mapState = (state: RootState) => ({ popupState: state.popup.state })
const mapDispatch = { closePopup: closePopup, downloadPresentation: downloadPresentation, addImage: addImage, addBackgroundImage: addBackgroundImage }

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch
type PopupProps = StateProps & DispatchProps

function Popup(props: PopupProps)
{
    let render = <></>;
    let content;
    switch (props.popupState)
    {
        case 'importPresentation':
            content = <ImportPresentation setNewPresentation={props.downloadPresentation}/>;
            break;
        case 'importImage':
            content = <ImportImage getNewImage={props.addImage}/>;
            break;
        case 'importBackgroundImage':
            content = <ImportImage getNewImage={props.addBackgroundImage}/>;
            break;
    }

    let presentation: type.Presentation = createPresentation({});
    if (props.popupState !== 'close')
    {
        render = <div className={style.wrapper}>
            <div className={style.modal}>
                <div className={style.header}>
                    <button type="button" className={style.close_button} data-dismiss="modal" aria-label="Close"
                            onClick={(e) => props.closePopup()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div>
                    {content}
                </div>
            </div>
        </div>
    }
    return (
        render
    )
}

export default connect(mapState, mapDispatch)(Popup)