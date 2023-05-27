import React, {useState} from "react";
import Timer from "./Timer.jsx";
import Settings from "./Settings.jsx";
import History from "./History.jsx";
import Nav from "./Nav.jsx";

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
                overtimeRatio={overtimeRatio} />
            <div style={{height: "50px"}} />
            <div className="pure-g">
                <div className="pure-u-1-12 pure-u-md-1-4" />
                <div className="pure-g pure-u-20-24 pure-u-md-1-2" style={{backgroundColor:"red"}}>
                    <Nav active={active}
                        setActive={setActive} />
                    {
                        active ? <Settings defaultMinutes={defaultMinutes}
                            setDefaultMinutes={setDefaultMinutes}
                            setCurrentMinutes={setCurrentMinutes}
                            breakBonus={breakBonus}
                            setBreakBonus={setBreakBonus}
                            overtimeRatio={overtimeRatio}
                            setOvertimeRatio={setOvertimeRatio} />
                        : <History />
                    } 
                </div>
                <div className="pure-u-1-12 pure-u-md-1-4" />
            </div>
        </>
    )
}

export default App