import React, {useState} from "react";
import Timer from "./Timer.js";
import Settings from "./Settings.js";

const App = () =>{
    const [defaultMinutes, setDefaultMinutes] = useState(0);
    const [settingsActive, setSettingsActive] = useState(false);
    const [breakBonus, setBreakBonus] = useState(5);
    const [bonusRatio, setBonusRatio] = useState(0.2);

    return ( 
        <>
            <button onClick={()=>{setSettingsActive(!settingsActive)}}>Settings</button>
            {settingsActive && 
                <Settings defaultMinutes={defaultMinutes}
                    setDefaultMinutes={setDefaultMinutes}
                    breakBonus={breakBonus}
                    setBreakBonus={setBreakBonus}
                    bonusRatio={bonusRatio}
                    setBonusRatio={setBonusRatio}>
                </Settings>} 
            <Timer defaultMinutes={defaultMinutes}
                breakBonus={breakBonus}
                bonusRatio={bonusRatio}>
            </Timer>
            <h1>
                Pomodoro Timer
            </h1>
        </>
    )
}

export default App