import ImageUploader from "./Preview";
import React, {useState, useCallback} from "react";
import Dropper from "./Dropper";
import '../styles/app.scss'

function App() {

    let [color, setColor] = useState('');

    return (
        <div className="app">
            <div className="app-container" style={{background: color}}>
                <ImageUploader/>
            </div>

            <Dropper onChangeColor={setColor}/>
        </div>
    );
}

export default App;
