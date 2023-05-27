import React, {useState, useRef, useEffect} from "react";

const Timer = ({currentMinutes, setCurrentMinutes, defaultMinutes, breakBonus, overtimeRatio}) => {
    const status = {paused: "PAUSED", running: "RUNNING", overtime: "OVERTIME", break: "BREAK"};
    const [phase, setPhase] = useState(status.paused);
    const [currentSeconds, setCurrentSeconds] = useState(5);
    const [overtimeSeconds, setOvertimeSeconds] = useState(0);
    const [overtimeMinutes, setOvertimeMinutes] = useState(0);
    const [breakSeconds, setBreakSeconds] = useState(0);
    const [breakMinutes, setBreakMinutes] = useState(0);
    const interval = useRef();

    // setCurrentMinutes is a prop from App, so I use it separately from other setters
    // since it'll try to render App while rendering Timer. useEffect prevents that.
    useEffect(()=>{
        if (currentSeconds === 59) {
            setCurrentMinutes(m => m - 1);
        }
    }, [currentSeconds]);

    const handleStyle = () => {
        let timerStyle;
        if (phase === status.running) {
            timerStyle = "runningTimer";
        } else if (phase === status.overtime) {
            timerStyle = "overtimeTimer";
        } else if (phase === status.paused) {
            timerStyle = "pausedTimer";
        } else {
            timerStyle = "breakTimer";
        }
        return `basicTimer ${timerStyle}`;
    };

    const handleReset = () => {
        setPhase(status.paused);
        setCurrentSeconds(5);
        setCurrentMinutes(defaultMinutes);
        setOvertimeSeconds(0);
        setOvertimeMinutes(0); 
        clearInterval(interval.current);
    };
    
    const handleClick = () => {
        // State is asynchronous so I use "p" instead of "phase" to run the logic inside setInterval
        // I still need "phase" to re-render the timer with styles for different phases
        let p;
        const workTime = () => {
            if (p === status.running) {
                setCurrentSeconds(s => {
                    if (s === 0) {
                        if (currentMinutes > 0) {
                            return 59;
                        } else {
                            p = status.overtime;
                            setPhase(p);
                            setOvertimeSeconds(1);
                            setBreakMinutes(brM => brM + breakBonus);
                            return 0;
                        }
                    } else {
                        return s - 1;
                    }
                });
            } else if (p === status.overtime) {
                setOvertimeSeconds(boS => {    
                    if (boS === 59) {
                        setOvertimeMinutes(boM => boM + 1);
                        return 0;
                    } else {
                        return boS + 1;
                    }
                });
                setBreakSeconds(brS => {
                    let maxSeconds = brS + overtimeRatio;
                    if (maxSeconds > 60) {
                        setBreakMinutes(brM => brM + 1);
                        return maxSeconds - 60;
                    } else {
                        return brS + overtimeRatio;
                    }
                });
            } 
        };
        
        const breakTime = () => {
            if (p === status.break) {
                setBreakSeconds(brS => {
                    if (brS < 1) {
                        if (breakMinutes > 0) {
                            setBreakMinutes(brM => brM - 1);
                            return 59;
                        } else {
                            handleReset();
                            return 0;
                        }
                    } else {
                        return brS - 1;
                    }
                });
            }
        };

        if (phase === status.paused) {     
            p = status.running; 
            setPhase(p);
            interval.current = setInterval(workTime, 1000);
        } else if (phase === status.running) {
            clearInterval(interval.current);
            p = status.paused;
            setPhase(p);
        } else if (phase === status.overtime) {
            clearInterval(interval.current);
            p = status.break;
            setPhase(p);
            interval.current = setInterval(breakTime, 1000);
        } else {
            handleReset();
        }
    };

    const handleResult = () => {
        if (phase === status.running || phase === status.paused) {
            return currentMinutes.toLocaleString("en-us", {minimumIntegerDigits : 2}) + " : " +
                currentSeconds.toLocaleString("en-us", {minimumIntegerDigits: 2});
        } else if (phase === status.overtime) {
            return overtimeMinutes.toLocaleString("en-us", {minimumIntegerDigits : 2}) + " : " +
                overtimeSeconds.toLocaleString("en-us", {minimumIntegerDigits: 2});
        } else if (phase === status.break) {
            return breakMinutes.toLocaleString("en-us", {minimumIntegerDigits : 2}) + " : " +
                Math.floor(breakSeconds).toLocaleString("en-us", {minimumIntegerDigits: 2});
        }
    };

    return (
        <button 
            type="button" 
            className={handleStyle()}
            onClick={handleClick}
        >
            <span className="phase">{phase}</span><br />
            <span className="time">{handleResult()}</span>
        </button>
    );
};

export default Timer;