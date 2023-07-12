import React, {useState} from "react";
import Timer from "./Timer";
import Settings from "./Settings";
import History from "./History";
import Nav from "./Nav";

const App = () =>{
    const [defaultMinutes, setDefaultMinutes] = useState(0);
    const [currentMinutes, setCurrentMinutes] = useState(defaultMinutes);
    const [active, setActive] = useState(false);
    const [breakBonus, setBreakBonus] = useState(5);
    const [overtimeRatio, setOvertimeRatio] = useState(0.2);
    const [refresh, setRefresh] = useState(0);

    return ( 
        <>
            <h1>Pomodoro Timer</h1>
            <Timer currentMinutes={currentMinutes}
                setCurrentMinutes={setCurrentMinutes} 
                defaultMinutes={defaultMinutes}
                breakBonus={breakBonus}
                overtimeRatio={overtimeRatio}
                setRefresh={setRefresh} />
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
                            setCurrentMinutes={setCurrentMinutes}
                            breakBonus={breakBonus}
                            setBreakBonus={setBreakBonus}
                            overtimeRatio={overtimeRatio}
                            setOvertimeRatio={setOvertimeRatio} />
                        : <History refresh={refresh}
                            setRefresh={setRefresh} />
                    } 
                </div>
                <div className="pure-u-1-12 pure-u-md-1-4" />
            </div>
        </>
    )
}

export default App