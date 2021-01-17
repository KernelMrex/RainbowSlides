import React from 'react';
import * as type from '../core/types';
import style from './TopBar.module.css';
import Name from './Name/Name';
import TopBarButtons from './TopBarButtons/TopBarButtons';
import {connect} from "react-redux";
import {RootState} from "../store/store";

const mapState = (state: RootState) => ({ name: state.presentation.name })

type StateProps = ReturnType<typeof mapState>
type TopBarProps = StateProps

function TopBar(props: TopBarProps)
{
    return (
        <div className={style.wrapper}>
            <Name name={props.name}/>
            {/*<TopBarButtons presentation={props.presentation} modal={props.modal}/>*/}
        </div>
    )
}

export default connect(mapState)(TopBar)