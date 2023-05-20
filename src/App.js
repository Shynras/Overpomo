import React, {useState} from "react";
import Timer from "./Timer.js";
import Settings from "./Settings.js";
import History from "./History.js";
import Nav from "./Nav.js";

const App = () =>{
    const [defaultMinutes, setDefaultMinutes] = useState(0);
    const [active, setActive] = useState(false);
    const [breakBonus, setBreakBonus] = useState(5);
    const [bonusRatio, setBonusRatio] = useState(0.2);

    return ( 
        <>
            <h1>Pomodoro Timer</h1>
            <Timer defaultMinutes={defaultMinutes}
                breakBonus={breakBonus}
                bonusRatio={bonusRatio}>
            </Timer>
            <div className="bottom">
                <Nav setActive={setActive}>
                </Nav>
                {
                    active ? <Settings defaultMinutes={defaultMinutes}
                        setDefaultMinutes={setDefaultMinutes}
                        breakBonus={breakBonus}
                        setBreakBonus={setBreakBonus}
                        bonusRatio={bonusRatio}
                        setBonusRatio={setBonusRatio}>
                    </Settings> :
                    <History></History>
                } 
            </div>
        </>
    )
}

export default App