import React, {useState, useRef} from "react";
import Settings from "./Settings";
import History from "./History";
import Nav from "./Nav";

const Timer = () => {
    const [active, setActive] = useState(false);
    const interval = useRef<number | null>(null);
    const phase = {paused: "PAUSED", running: "RUNNING", overtime: "OVERTIME", break: "BREAK"};
    const defaultSeconds = 5;
    const [defaultMinutes, setDefaultMinutes] = useState(0);
    const [time, setTime] = useState({
        p: phase.paused,                //timer phase
        s: defaultSeconds,              //timer seconds
        m: defaultMinutes,              //timer minutes
        w: 0,                           //total worked time in current session
        b: 0                            //total break time in current session
    });
    const [overtimeRatio, setOvertimeRatio] = useState(0.2);
    const [bonus, setBonus] = useState(5);
    const timeStamp = useRef<Date | null>(null);
    const remainingBreak = useRef({s: 0, m: 0});

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

            if (time.p !== phase.break) {
                time.w += 1000;
            } else {
                time.b += 1000;
            }

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
                    clearInterval(interval.current);
                    remainingBreak.current.s = 0;
                    remainingBreak.current.m = 0;
                    time.p = phase.paused;
                    time.s = defaultSeconds;
                    time.m = defaultMinutes;
                }
            }
            return {p : time.p, s : time.s, m : time.m, w: time.w, b: time.b};
        });
    };

    const startTimer = () => {
        timeStamp.current = new Date();
        interval.current = window.setInterval(counter, 1000);
    };

    const calculateBreak = () => {
        let m = bonus;
        let s = overtimeRatio * (new Date().getTime() - timeStamp.current.getTime())/1000;
        while (s > 59) {
            m++;
            s -= 60;
        } 
        remainingBreak.current.s += Math.floor(s);
        remainingBreak.current.m += m;
    };

    const handleClick = () => {
        // setInterval creates a list of dependencies (p, m, s, ...) for the interval function
        // The interval function cannot read changes to those dependencies happening outside of it
        // When that happens clear and set a new interval, which will use updated dependencies
        setTime(time => {
            if (time.p === phase.paused) {
                time.p = phase.running;
                startTimer();
            } else if (time.p === phase.running) {
                clearInterval(interval.current);
                time.p = phase.paused;
            } else if (time.p === phase.overtime) {
                clearInterval(interval.current);
                time.p = phase.break;
                calculateBreak();
                time.s = remainingBreak.current.s;
                time.m = remainingBreak.current.m;
                startTimer();
            } else {
                clearInterval(interval.current);
                remainingBreak.current.s = time.s;
                remainingBreak.current.m = time.m; 
                time.p = phase.paused;
                time.s = defaultSeconds;
                time.m = defaultMinutes;
            }

            return {p : time.p, s : time.s, m : time.m, w: time.w, b: time.b};
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
                            phase={phase}
                            interval={interval} />
                        : <History time={time}
                            setTime={setTime} />
                    } 
                </div>
                <div className="pure-u-1-12 pure-u-md-1-4" />
            </div>
        </>
    );
};

export default Timer