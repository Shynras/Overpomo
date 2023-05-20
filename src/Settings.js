import React from "react";

const Settings = ({defaultMinutes, setDefaultMinutes, 
    breakBonus, setBreakBonus, 
    bonusRatio, setBonusRatio}) => {

    return (
        <>
            <form className="settings">
                <label htmlFor="minutes">Work Time</label>
                <input type="number" id="minutes" value={defaultMinutes} 
                    onChange={(e) => setDefaultMinutes(Number(e.target.value))}></input><br></br>
                <label htmlFor="bonus">Break</label>
                <input type="number" id="bonus" value={breakBonus} 
                    onChange={(e) => setBreakBonus(Number(e.target.value))}></input><br></br>
                <label htmlFor="ratio">Overtime Ratio</label>
                <input type="number" id="ratio" value={bonusRatio} 
                    onChange={(e) => setBonusRatio(Number(e.target.value))}></input><br></br>
            </form>
        </>
    );
}

export default Settings;