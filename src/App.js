import React, {useState} from "react";
import Timer from "./Timer.js";
import Settings from "./Settings.js";
import History from "./History.js";
import Nav from "./Nav.js";

const App = () =>{
    const [defaultMinutes, setDefaultMinutes] = useState(0);
    const [currentMinutes, setCurrentMinutes] = useState(defaultMinutes);
    const [active, setActive] = useState(false);
    const [breakBonus, setBreakBonus] = useState(5);
    const [overtimeRatio, setOvertimeRatio] = useState(0.2);

    return ( 
        <>
            <h1>Pomodoro Timer</h1>
            <Timer currentMinutes={currentMinutes}
                setCurrentMinutes={setCurrentMinutes} 
                defaultMinutes={defaultMinutes}
                breakBonus={breakBonus}
                overtimeRatio={overtimeRatio}>
            </Timer>
            <div className="bottom">
                <Nav active={active}
                    setActive={setActive}>
                </Nav>
                {
                    active ? <Settings defaultMinutes={defaultMinutes}
                        setDefaultMinutes={setDefaultMinutes}
                        setCurrentMinutes={setCurrentMinutes}
                        breakBonus={breakBonus}
                        setBreakBonus={setBreakBonus}
                        overtimeRatio={overtimeRatio}
                        setOvertimeRatio={setOvertimeRatio}>
                    </Settings> :
                    <History></History>
                } 
            </div>
        </>
    )
}

export default App