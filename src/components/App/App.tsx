import React from 'react'
import Header from '../Header/Header'
import Subheader from '../Subheader/Subheader'
import Sidebar from '../Sidebar/Sidebar'
import PresentationViewer from '../PresenationViewer/PresentationViewer'

import './App.css'

export default function App()
{
    return (
        <div>
            <div className={'app__toolbar'}>
                <Header/>
                <Subheader/>
            </div>
            <div className={'app__workspace'}>
                <Sidebar/>
                <PresentationViewer/>
            </div>
        </div>
    )
}
