import React, {useState} from 'react';
import * as type from './core/types';
import style from './App.module.css'
import Footer from './Footer/Footer'
import TopBar from './TopBar/TopBar'
import Presentation from './Presentation/Presentation'
import Popup from './Popup/Popup'
import { createPresentation, getPresentationFromJSON } from './core/presentation/presentation';

interface Presentation
{
    presentation: type.Presentation
}

export default function App(props: Presentation)
{
    const useModal = () =>
    {
        const [isShowing, setIsShowing] = useState(false);

        function toggle()
        {
            setIsShowing(!isShowing);
        }

        return {
            isShowing,
            toggle,
        }
    };

    const useChangePresentation = () =>
    {
        const [presentation, setNewPresentation] = useState(props.presentation);

        function changePresentation(newPresentation: type.Presentation)
        {
            setNewPresentation(newPresentation);
        }

        function downloadPresentation(event: any)
        {
            const file = event.target.files[0];
            const fileReader = new FileReader();
            let newPresentation: type.Presentation = createPresentation();

            fileReader.readAsText(file);
            fileReader.onload = () =>
            {
                const JSONString = fileReader.result;
                if (typeof JSONString === 'string' && JSONString.slice(2, 6) === 'name')
                {
                    newPresentation = (getPresentationFromJSON(JSONString));
                }

                changePresentation(newPresentation)
            }
        }

        return {
            presentation,
            changePresentation,
            downloadPresentation
        }
    };

    const {presentation, changePresentation, downloadPresentation} = useChangePresentation();
    const {isShowing, toggle} = useModal();
        return (
            <div className={style.appWrapper}>
                <Popup isShowind={isShowing} hide={toggle} setNewPresentation={downloadPresentation}/>
                <div className={style.app}>
                    <TopBar presentation={presentation} modal={toggle}/>
                    <Presentation presentation={presentation} setNewPresentation={changePresentation}/>
                    <Footer/>
                </div>
            </div>
    )
};
