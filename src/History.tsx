import React, { ReactElement } from "react";

const History = () => {
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
            week.push(generateDay(k, 10+k*6, 10+k*3))
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