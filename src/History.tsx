import React, {useEffect} from "react";

type Data = {
    work: number,
    pause: number
}

const History = () => {
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

    const generateDay = (k:number, work:number, pause:number, hGraph:number) => {
        return (
            <div className="day pure-u-1-8" key={k} style={{height: hGraph}}>
                <div className="break" style={{height: pause}} />
                <div className="work" style={{height: work}} />
            </div>
        );
    };

    //takes last 7 days cache data, validates values, rescale data to fit graph
    const generateWeek = (data:Data[]) => {
        const hGraph = 200;
        const week:React.ReactElement[] = [];
        const maxWeekN = Math.max(...data.map(obj => (obj?.work ?? 0) + (obj?.pause ?? 0)), 1);
        const maxH = hGraph * 0.9;
        for (let k = 6; k >= 0; k--) {
            const work = (data[k]?.work ?? 0) * maxH / maxWeekN;
            const pause = (data[k]?.pause ?? 0) * maxH / maxWeekN; 
            week.push(generateDay(k, work, pause, hGraph));
        }
        return week;
    };

    return (
        <div className="pure-g">
            {generateWeek(lastSevenDays())}
        </div>
    );
}

export default History