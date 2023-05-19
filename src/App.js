import React, {useState} from "react";
import Timer from "./Timer.js";
import Settings from "./Settings.js";

const App = () =>{
    const [defaultMinutes, setDefaultMinutes] = useState(25);
    const [settingsActive, setSettingsActive] = useState(false);

    return ( 
        <>
            <button onClick={()=>{setSettingsActive(!settingsActive)}}>Settings</button>
            {settingsActive && <Settings defaultMinutes={defaultMinutes}
                setDefaultMinutes={setDefaultMinutes}>
            </Settings>} 
            <Timer defaultMinutes={defaultMinutes}>
            </Timer>
            <h1>
                Pomodoro Timer
            </h1>
        </>
    )
}

export default App