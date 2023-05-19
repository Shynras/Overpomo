import React, {useState, useRef} from "react";

const Timer = ({defaultMinutes}) => {
    const status = {paused: "PAUSED", running: "RUNNING", bonus: "BONUS"};
    const [phase, setPhase] = useState(status.paused);
    const [currentSeconds, setCurrentSeconds] = useState(0);
    const [currentMinutes, setCurrentMinutes] = useState(defaultMinutes);
    const [bonusSeconds, setBonusSeconds] = useState(0);
    const [bonusMinutes, setBonusMinutes] = useState(0);
    const interval = useRef();

    const handleStyle = () => {
        let timerStyle;
        if (phase === status.running) {
            timerStyle = "runningTimer";
        } else if (phase === status.bonus) {
            timerStyle = "bonusTimer";
        } else {
            timerStyle = "pausedTimer";
        }
        return `basicTimer ${timerStyle}`;
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
                            setCurrentMinutes(m => m - 1);
                            return 59;
                        } else {
                            p = status.bonus;
                            setPhase(p);
                            setBonusSeconds(1);
                            return 0;
                        }
                    } else {
                        return s - 1;
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
            setCurrentSeconds(0);
            setCurrentMinutes(defaultMinutes);
            setBonusSeconds(0);
            setBonusMinutes(0); 
            clearInterval(interval.current);
        }
    };

    const handleResult = () => {
        if (phase !== status.bonus) {
            return currentMinutes.toLocaleString("en-us", {minimumIntegerDigits : 2}) + " : " +
                currentSeconds.toLocaleString("en-us", {minimumIntegerDigits: 2});
        } else {
            return bonusMinutes.toLocaleString("en-us", {minimumIntegerDigits : 2}) + " : " +
                bonusSeconds.toLocaleString("en-us", {minimumIntegerDigits: 2});
        }
    };

    return (
        <button 
            type="button" 
            className={handleStyle()}
            onClick={handleClick}>
            {handleResult()}
        </button>
    );
};

export default Timer;