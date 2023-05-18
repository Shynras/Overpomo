import React, {useState, useRef, useEffect} from "react";


const Timer = (props) => {
    let [s, m, bs, bm] = [5, 0, 0, 0];
    const status = {paused: "PAUSED", running: "RUNNING", bonus: "BONUS"};
    const [phase, setPhase] = useState(status.paused);
    const [seconds, setSeconds] = useState(s);
    const [minutes, setMinutes] = useState(m);
    const [bonusSeconds, setBonusSeconds] = useState(bs);
    const [bonusMinutes, setBonusMinutes] = useState(bm);
    const interval = useRef();

    const handleStyle = () => {
        if (phase === status.running) {
            return {backgroundColor: "green"};
        } else if (phase === status.bonus) {
            return {backgroundColor: "blue"};
        } else {
            return {backgroundColor: "red"};
        }
    };

    const handleClick = () => {
        // State is asynchronous so I use "p" instead of "phase" inside setInterval
        // I still need "phase" to re-render the timer with styles for different phases
        let p;

        const workTime = () => {
            if (p === status.running) {
                setSeconds(seconds => {
                    if (seconds === 0) {
                        if (minutes > 0) {
                            setMinutes(minutes => minutes - 1);
                            return 59;
                        } else {
                            p = status.bonus;
                            setPhase(p);
                            setBonusSeconds(1);
                            return 0;
                        }
                    } else {
                        return seconds - 1;
                    }
                });
            } else if (p === status.bonus) {
                setBonusSeconds(bonusSeconds => {    
                    if (bonusSeconds === 59) {
                        setBonusMinutes(bonusMinutes => bonusMinutes + 1);
                        return 0;
                    } else {
                        return bonusSeconds + 1;
                    }
                });
            }
        };

        if (phase === status.paused) {     
            p = status.running; 
            setPhase(p);
            interval.current = setInterval(workTime, 1000);
        } else {
            p = status.paused;
            setPhase(p);
            setSeconds(s);
            setMinutes(m);
            setBonusSeconds(bs);
            setBonusMinutes(bm); 
            clearInterval(interval.current);
        }
    };

    const handleResult = () => {
        if (phase !== status.bonus) {
            return minutes.toLocaleString("en-us", {minimumIntegerDigits : 2}) + " : " +
                seconds.toLocaleString("en-us", {minimumIntegerDigits: 2});
        } else {
            return bonusMinutes.toLocaleString("en-us", {minimumIntegerDigits : 2}) + " : " +
                bonusSeconds.toLocaleString("en-us", {minimumIntegerDigits: 2});
        }
    };

    return (
        <button 
            type="button" 
            className={props.className} 
            style={handleStyle()} 
            onClick={handleClick}>
            {handleResult()}
        </button>
    );
};

export default Timer;