import React, { ReactElement } from "react";


const History = () => {
    const lastSevenDays:Array<[Date, number, number]> = [
        [new Date(2023, 7, 8), 4, 1],
        [new Date(2023, 7, 7), 0, 0],
        [new Date(2023, 7, 6), 1, 0.15],
        [new Date(2023, 7, 5), 11, 3],
        [new Date(2023, 7, 4), 5, 1.2],
        [new Date(2023, 7, 3), 7, 2],
        [new Date(2023, 7, 2), 1, 2],
    ]

    const generateDay = (k:number, w:number, b:number) => {
        return (
            <div className="day pure-u-1-8" key={k}>
                <div className="break" style={{height:b}} />
                <div className="work" style={{height:w}} />
            </div>
        );
    };
    const generateWeek = () => {
        const week:ReactElement[] = [];
        for (let k = 0; k < 7; k++) {
            week.push(generateDay(k, lastSevenDays[k][1] * 10, lastSevenDays[k][2] * 10))
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