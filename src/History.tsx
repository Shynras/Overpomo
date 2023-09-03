import React, {useRef, useEffect} from "react";

type Time = {
    p: string,
    s: number,
    m: number,
    w: number,
    b: number
}

type HistoryTypes = {
    time : Time,
    setTime : React.Dispatch<React.SetStateAction<Time>>
}

const History = ({time, setTime}: HistoryTypes) => {
    const haveCache = useRef<boolean>(false);
    const cache = useRef([]);
    const startingDay = useRef(new Date());
    const todayStats = useRef({todayW: 0, todayB: 0});
    const currentDay = new Date();

    //retrieve and parse data from last 7 days from cache
    const lastSevenDays = () => {
        const data = [];
        const today = new Date();
        for (let i = 1; i <= 7; i++) {
            const key = today.toLocaleDateString("en-US", {dateStyle:"short"});
            data.push(JSON.parse(localStorage.getItem(key)));
            today.setDate(today.getDate() - 1);
        }
        return data;
    };

    // cache is fetched only once at the first render
    if (!haveCache.current) {
        haveCache.current = true;
        cache.current = lastSevenDays();
    }

    // total time of work and break for the day
    todayStats.current = {
        todayW: cache.current[0]?.work + time.w, 
        todayB: cache.current[0]?.pause + time.b
    };
    //const todayW = cache.current[0]?.work + time.w;
    //const todayB = cache.current[0]?.pause + time.b;

    const save = (d:Date = new Date()) => {
        console.log(d);
        const key = d.toLocaleDateString("en-US", {dateStyle:"short"});
        localStorage.setItem(key, JSON.stringify({work: todayStats.current.todayW, pause: todayStats.current.todayB}));
        haveCache.current = false;
        setTime(t => {
            return {p: t.p, s: t.s, m: t.m, w: 0, b: 0};
        });
    };

    // automatically saves cache at midnight for current day and reset data for new day
    if (startingDay.current.getDay() !== currentDay.getDay()) {
        save(startingDay.current);
    }

    // EventListeners in react create dependencies for variables needed when created
    // When the component rerender variables are recreated
    // The reference the listener has is no longer valid. 
    // I'm using todayStats useRef so that the reference persist after rerender
    // Another option would have been to remove and recreate the event listener for each render
    useEffect(()=> {
        window.addEventListener("beforeunload", () => save(), false);
    },[]);

    //takes last 7 days cache data, validates values, rescale data to fit graph
    const generateWeek = () => {
        const hGraph = 200;
        const maxH = hGraph * 0.9;
        const week:React.ReactElement[] = [];
        const maxWeekN = Math.max(...cache.current.map((obj, k) => {
            if (k === 0) {
                return todayStats.current.todayW + todayStats.current.todayB;
            } else {
                return (obj?.work ?? 0) + (obj?.pause ?? 0);
            }
        }), 1);

        const generateDay = (k:number, work:number, pause:number, hGraph:number) => {
            return (
                <div className="day" key={k} style={{height: hGraph}}>
                    <div className="break" style={{height: pause}} />
                    <div className="work" style={{height: work}} />
                </div>
            );
        };

        for (let k = 6; k >= 0; k--) {
            let work:number;
            let pause:number;

            if (k === 0) {
                work = todayStats.current.todayW * maxH / maxWeekN;
                pause = todayStats.current.todayB * maxH / maxWeekN;
            } else {
                work = (cache.current[k]?.work ?? 0) * maxH / maxWeekN;
                pause = (cache.current[k]?.pause ?? 0) * maxH / maxWeekN;
            }

            week.push(generateDay(k, work, pause, hGraph));
        }

        return week;
    };

    return (
        <div className="pure-g">
            {generateWeek()}
        </div>
    );
}

export default History