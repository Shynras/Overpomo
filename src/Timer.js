import React, {useState, useRef} from "react";


const Timer = (props) => {
    const s = 5;
    const m = 0;
    const [active, setActive] = useState(false);
    const [minutes, setMinutes] = useState(m);
    const [seconds, setSeconds] = useState(s);
    const interval = useRef();

    const handleClick = () => {
        setActive(!active);
        const time = () => {
            setSeconds((seconds) => {
                if (seconds === 0) {
                    if (minutes > 0) {
                        setMinutes(minutes => minutes - 1);
                        return 59;
                    } else {
                        console.log(interval.current)
                        clearInterval(interval.current);
                        setMinutes(m);
                        return s;
                    }
                } else if (seconds === 1 && minutes === 0) {
                    setActive(false);
                    return 0;
                } else {
                    return seconds - 1;
                }
            });
        }

        if (!active) {
            interval.current = setInterval(time, 1000);
        } else {
            clearInterval(interval.current);
        }
    };

    return (
        <button 
            type="button" 
            className={props.className} 
            style ={{backgroundColor: active ? "green" : "red"}} 
            onClick={handleClick}>
            {minutes.toLocaleString("en-us", {minimumIntegerDigits : 2}) + " : " +
            seconds.toLocaleString("en-us", {minimumIntegerDigits: 2})}
        </button>
    );
};

export default Timer;