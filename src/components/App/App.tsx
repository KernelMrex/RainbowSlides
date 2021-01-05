import React from 'react'
import Header from '../Header/Header'
import PresentationViewer from '../PresenationViewer/PresentationViewer'
import Sidebar from '../Sidebar/Sidebar'
import Subheader from '../Subheader/Subheader'
import './App.css'

export default function App()
{
    return (
        <div>
            <div className={ 'app__toolbar' }>
                <Header/>
                <Subheader/>
            </div>
            <div className={ 'app__workspace' }>
                <Sidebar/>
                <PresentationViewer/>
            </div>
        </div>
    )
}
