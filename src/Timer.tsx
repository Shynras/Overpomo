import React, {useState, useRef} from "react";
import Settings from "./Settings";
import History from "./History";
import Nav from "./Nav";

type Data = {
    work : number,
    pause : number
}

const Timer = () => {
    const [active, setActive] = useState(false);
    const interval = useRef<number | null>(null);
    const phase = {paused: "PAUSED", running: "RUNNING", overtime: "OVERTIME", break: "BREAK"};
    const defaultSeconds = 5;
    const [defaultMinutes, setDefaultMinutes] = useState(0);
    const [time, setTime] = useState({p: phase.paused, s: defaultSeconds, m: defaultMinutes});
    const [overtimeRatio, setOvertimeRatio] = useState(0.2);
    const [bonus, setBonus] = useState(5);
    const timeStamp = useRef<Date | null>(null);
    const [data, setData] = useState({work: 0, pause: 0});

    const handleStyle = () => {
        let c:string;
        switch(time.p) {
            case phase.running:
                c = "running-timer";
                break;
            case phase.overtime:
                c = "overtime-timer";
                break;
            case phase.paused:
                c = "paused-timer";
                break;
            default:
                c = "break-timer";
        }

        return `pure-button timer-button ${c}`;
    };

    const saveTime = (k:keyof Data) => {
        const now = new Date();
        const key = now.toLocaleDateString("en-US", {dateStyle:"short"});
        const previousData = JSON.parse(localStorage.getItem(key));
        const data:Data = {
            work : previousData?.work ?? 0,
            pause : previousData?.pause ?? 0
        };
        data[k] += now.getTime() - timeStamp.current.getTime();
        localStorage.setItem(key, JSON.stringify(data));
    };
    
    const handleClick = () => {
        const counter = () => {
            setTime(time => {
                const countdown = () => {
                    if (time.s) {
                        time.s--;
                    } else {
                        time.m--;
                        time.s = 59;
                    }
                };

                if (time.p === phase.running) {
                    if (time.s || time.m) {
                        countdown();
                    } else {
                        time.s = 1;
                        time.p = phase.overtime;
                    }
                } else if (time.p === phase.overtime) {
                    if (time.s === 59) {
                        time.s = 0;
                        time.m++;
                    } else {
                        time.s++;
                    }
                } else if (time.p === phase.break) {
                    if (time.s || time.m) {
                        countdown();
                    } else {
                        time.p = phase.paused;
                        time.s = defaultSeconds;
                        time.m = defaultMinutes;
                        clearInterval(interval.current);
                    }
                }
                return {p : time.p, s : time.s, m : time.m};
            });
        };

        const calculateBreak = () => {
            let m = bonus;
            let s = overtimeRatio * (new Date().getTime() - timeStamp.current.getTime())/1000;
            while (s > 59) {
                m++;
                s -= 60;
            }
            return [m, Math.floor(s)];
        };

        const timeSpent = (t:number) => {
            const now = new Date();
            return t + now.getTime() - timeStamp.current.getTime();
        };

        const stopTimer = (s:string) => {
            clearInterval(interval.current);
            setData(d => {
                if (s === "work") {
                    return {work: timeSpent(d.work), pause: d.pause};
                } else if (s === "pause") {
                    return {work: d.work, pause: timeSpent(d.pause)};
                }
            });
        };

        const startTimer = () => {
            timeStamp.current = new Date();
            interval.current = window.setInterval(counter, 1000);
        };

        // setInterval creates a list of dependencies (p, m, s, ...) for the interval function
        // The interval function cannot read changes to those dependencies happening outside of it
        // When that happens clear and set a new interval, which will use updated dependencies
        setTime(time => {
            if (time.p === phase.paused) {
                time.p = phase.running;
                startTimer();
            } else if (time.p === phase.running) {
                time.p = phase.paused;
                stopTimer("work");
            } else if (time.p === phase.overtime) {
                time.p = phase.break;
                [time.m, time.s] = calculateBreak();
                stopTimer("work");
                startTimer();
            } else {
                time.p = phase.paused;
                time.s = defaultSeconds;
                time.m = defaultMinutes;
                stopTimer("pause");
            }
            return {p : time.p, s : time.s, m : time.m};
        });
    };

    const handleResult = () => {
        return time.m.toLocaleString("en-us", {minimumIntegerDigits : 2}) + " : " +
            Math.floor(time.s).toLocaleString("en-us", {minimumIntegerDigits: 2});
    };

    return (
        <>
            <button 
                type="button" 
                className={handleStyle()}
                onClick={handleClick}>
                <span className="phase">{time.p}</span><br />
                <span className="time">{handleResult()}</span>
            </button>
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
                            setTime={setTime}
                            bonus={bonus}
                            setBonus={setBonus}
                            overtimeRatio={overtimeRatio}
                            setOvertimeRatio={setOvertimeRatio}
                            phase={phase} />
                        : <History />
                    } 
                </div>
                <div className="pure-u-1-12 pure-u-md-1-4" />
            </div>
        </>
    );
};

export default Timer