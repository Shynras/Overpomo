import React, {useState, useRef} from "react";
import Timer from "./Timer";
import Settings from "./Settings";
import History from "./History";
import Nav from "./Nav";

const App = () =>{
    // toggle between History and Settings
    const [active, setActive] = useState(false);
    
    // settings variables
    const [defaultMinutes, setDefaultMinutes] = useState(0);
    const [minutes, setMinutes] = useState(defaultMinutes);
    const [bonus, setBonus] = useState(5);
    const [overtimeRatio, setOvertimeRatio] = useState(0.2);
    
    // interval id that runs the timer
    const interval = useRef<number | null>(null);
    
    // usage data to populate History
    const [data, setData] = useState({work: 0, pause: 0});

    return ( 
        <>
            <h1>Pomodoro Timer</h1>
            <Timer minutes={minutes}
                setMinutes={setMinutes} 
                defaultMinutes={defaultMinutes}
                bonus={bonus}
                overtimeRatio={overtimeRatio}
                interval ={interval}
                setData = {setData} />
            <div style={{height: "50px"}} />
            <div className="pure-g">
                <div className="pure-u-1-12 pure-u-md-1-4" />
                <div className="pure-g pure-u-20-24 pure-u-md-1-2" 
                    style={{backgroundColor:"#333333", color: "#ffffff"}}>
                    <Nav active={active}
                        setActive={setActive} />
                    {
                        active ? <Settings defaultMinutes={defaultMinutes}
                            setDefaultMinutes={setDefaultMinutes}
                            setMinutes={setMinutes}
                            bonus={bonus}
                            setBonus={setBonus}
                            overtimeRatio={overtimeRatio}
                            setOvertimeRatio={setOvertimeRatio}
                            interval={interval} />
                        : <History />
                    } 
                </div>
                <div className="pure-u-1-12 pure-u-md-1-4" />
            </div>
        </>
    )
}

export default App