import React from 'react'
import { connect } from 'react-redux'
import { closePopup } from '../store/popup/actions'
import { addBackgroundImage, addImage, downloadPresentation } from '../store/presentation/actions'
import { RootState } from '../store/store'
import ImportImage from './ImportImage/ImportImage'
import ImportPresentation from './ImportPresentation/ImportPresentation'
import style from './Popup.module.css'

const mapState = (state: RootState) => ({ popupState: state.popup.state })
const mapDispatch = {
    closePopup: closePopup,
    downloadPresentation: downloadPresentation,
    addImage: addImage,
    addBackgroundImage: addBackgroundImage,
}

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch
type PopupProps = StateProps & DispatchProps

function Popup(props: PopupProps)
{
    let content
    switch (props.popupState)
    {
        case 'importPresentation':
            content = <ImportPresentation setNewPresentation={ props.downloadPresentation }/>
            break
        case 'importImage':
            content = <ImportImage getNewImage={ props.addImage }/>
            break
        case 'importBackgroundImage':
            content = <ImportImage getNewImage={ props.addBackgroundImage }/>
            break
    }

    let render = <></>
    if (props.popupState !== 'close')
    {
        render = <div className={ style.wrapper }>
            <div className={ style.modal }>
                <div className={ style.header }>
                    <button type="button" className={ style.close_button } data-dismiss="modal" aria-label="Close"
                            onClick={ props.closePopup }>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div>
                    { content }
                </div>
            </div>
        </div>
    }

    return render
}

export default connect(mapState, mapDispatch)(Popup)