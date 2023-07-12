import React, {useEffect} from "react";

type Data = {
    worked: number,
    paused: number
}

type Refresh = {
    refresh: number
    setRefresh: React.Dispatch<React.SetStateAction<number>>
}

const History = ({refresh, setRefresh}:Refresh) => {
    //Timer creates new data, saves it in cache, ask History to refresh
    useEffect(()=>{setRefresh(0)},[refresh]);

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

    const generateDay = (k:number, worked:number, paused:number, hGraph:number) => {
        return (
            <div className="day pure-u-1-8" key={k} style={{height: hGraph}}>
                <div className="break" style={{height: paused}} />
                <div className="work" style={{height: worked}} />
            </div>
        );
    };

    //takes last 7 days cache data, validates values, rescale data to fit graph
    const generateWeek = (data:Data[]) => {
        const hGraph = 200;
        const week:React.ReactElement[] = [];
        const maxWeekN = Math.max(...data.map(obj => (obj?.worked ?? 0) + (obj?.paused ?? 0)), 1);
        const maxH = hGraph * 0.9;
        for (let k = 6; k >= 0; k--) {
            const worked = (data[k]?.worked ?? 0) * maxH / maxWeekN;
            const paused = (data[k]?.paused ?? 0) * maxH / maxWeekN; 
            week.push(generateDay(k, worked, paused, hGraph));
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