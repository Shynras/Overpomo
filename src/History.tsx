import React, {useRef} from "react";

const History = () => {
    const haveCache = useRef<boolean>(false);
    const cache = useRef([]);

    //retrieve and parse data from last 7 days from cache
    const lastSevenDays = () => {
        const today = new Date();
        const data = []; 
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

    const generateDay = (k:number, work:number, pause:number, hGraph:number) => {
        return (
            <div className="day" key={k} style={{height: hGraph}}>
                <div className="break" style={{height: pause}} />
                <div className="work" style={{height: work}} />
            </div>
        );
    };

    //takes last 7 days cache data, validates values, rescale data to fit graph
    const generateWeek = () => {
        const hGraph = 200;
        const week:React.ReactElement[] = [];
        const maxWeekN = Math.max(...cache.current.map(
            obj => (obj?.work ?? 0) + (obj?.pause ?? 0)
        ), 1);
        const maxH = hGraph * 0.9;
        for (let k = 6; k >= 0; k--) {
            const work = (cache.current[k]?.work ?? 0) * maxH / maxWeekN;
            const pause = (cache.current[k]?.pause ?? 0) * maxH / maxWeekN;
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