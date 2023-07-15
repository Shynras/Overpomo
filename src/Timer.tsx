import React, {useState, useRef, MutableRefObject} from "react";

type Data = {
    work : number,
    pause : number
}

type TimerTypes = {
    minutes : number, 
    setMinutes : React.Dispatch<React.SetStateAction<number>>,
    defaultMinutes : number, 
    bonus : number, 
    overtimeRatio : number,
    interval : MutableRefObject<number>,
    setData : React.Dispatch<React.SetStateAction<Data>>
}

const Timer = ({
    minutes, 
    setMinutes, 
    defaultMinutes, 
    bonus, 
    overtimeRatio,
    interval,
    setData} : TimerTypes) => {

    const defaultSeconds = 5;
    const status = {paused: "PAUSED", running: "RUNNING", overtime: "OVERTIME", break: "BREAK"};
    const [phase, setPhase] = useState(status.paused);
    const [seconds, setSeconds] = useState(defaultSeconds);
    const timeStamp = useRef<Date | null>(null);

    const handleStyle = () => {
        let s:string;
        switch(phase) {
            case status.running:
                s = "running-timer";
                break;
            case status.overtime:
                s = "overtime-timer";
                break;
            case status.paused:
                s = "paused-timer";
                break;
            default:
                s = "break-timer";
        }

        return `pure-button timer-button ${s}`;
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
        // State inside setInterval is only read at the first execution, setting state is async
        // It's cleaner to use p, s, m to run the logic and set the state all at once at the end
        let p:string = phase;
        let s:number = seconds;
        let m:number = minutes;

        const time = () => {
            const countdown = () => {
                if (s) {
                    s--;
                } else {
                    m--;
                    s = 59;
                }
            };

            if (p === status.running) {
                if (s || m) {
                    countdown();
                } else {
                    s = 1;
                    p = status.overtime;
                }
            } else if (p === status.overtime) {
                if (s === 59) {
                    s = 0;
                    m++;
                } else {
                    s++;
                }
            } else if (p === status.break) {
                if (s || m) {
                    countdown();
                } else {
                    p = status.paused;
                    s = defaultSeconds;
                    m = defaultMinutes;
                    clearInterval(interval.current);
                }
            }

            setPhase(p);
            setSeconds(s);
            setMinutes(m);
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
            interval.current = window.setInterval(time, 1000);
        };

        // setInterval creates a list of dependencies (p, m, s, ...) for the interval function
        // The interval function cannot read changes to those dependencies happening outside of it
        // When that happens clear and set a new interval, which will use updated dependencies
        if (phase === status.paused) {
            p = status.running;
            startTimer();
        } else if (phase === status.running) {
            p = status.paused;
            stopTimer("work");
        } else if (phase === status.overtime) {
            p = status.break;
            [m, s] = calculateBreak();
            stopTimer("work");
            startTimer();
        } else {
            p = status.paused;
            s = defaultSeconds;
            m = defaultMinutes;
            stopTimer("pause");
        }

        setPhase(p);
        setSeconds(s);
        setMinutes(m);
    };

    const handleResult = () => {
        return minutes.toLocaleString("en-us", {minimumIntegerDigits : 2}) + " : " +
            Math.floor(seconds).toLocaleString("en-us", {minimumIntegerDigits: 2});
    };

    return (
        <button 
            type="button" 
            className={handleStyle()}
            onClick={handleClick}>
            <span className="phase">{phase}</span><br />
            <span className="time">{handleResult()}</span>
        </button>
    );
};

export default Timer