import React from "react";

const Settings = ({defaultMinutes, setDefaultMinutes, 
    breakBonus, setBreakBonus, 
    bonusRatio, setBonusRatio}) => {

    return (
        <>
            <form>
                <input type="number" value={defaultMinutes} 
                    onChange={(e) => setDefaultMinutes(Number(e.target.value))}></input>
                <input type="number" value={breakBonus} 
                    onChange={(e) => setBreakBonus(Number(e.target.value))}></input>
                <input type="number" value={bonusRatio} 
                    onChange={(e) => setBonusRatio(Number(e.target.value))}></input>
            </form>
            <p>{defaultMinutes}</p>
        </>
    );
}

export default Settings;