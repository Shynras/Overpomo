import React, { ReactElement } from "react";

type Data = {
    worked: number,
    paused: number
}

const History = () => {
    const lastSevenDays = () => {
        const today = new Date();
        const arr = []; 
        for (let i = 1; i <= 7; i++) {
            const key = today.toLocaleDateString("en-US", {dateStyle:"short"});
            arr.push(JSON.parse(localStorage.getItem(key)));
            today.setDate(today.getDate() - i);
        }
        return arr;
    };

    const generateDay = (k:number, data:Data) => {
        return (
            <div className="day pure-u-1-8" key={k}>
                <div className="break" style={{height: data?.paused ?? 0}} />
                <div className="work" style={{height: data?.worked ?? 0}} />
            </div>
        );
    };
    const generateWeek = (arr:Data[]) => {
        const week:ReactElement[] = [];
        for (let k = 0; k < 7; k++) {
            week.push(generateDay(k, arr[k]));
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