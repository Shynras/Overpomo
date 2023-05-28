import React, {useEffect, Dispatch, SetStateAction} from "react";

type SettingsTypes = {
    defaultMinutes: number,
    setDefaultMinutes: Dispatch<SetStateAction<number>>,
    setCurrentMinutes: Dispatch<SetStateAction<number>>,
    breakBonus: number,
    setBreakBonus: Dispatch<SetStateAction<number>>,
    overtimeRatio: number,
    setOvertimeRatio: Dispatch<SetStateAction<number>>
}

const Settings = ({
    defaultMinutes, 
    setDefaultMinutes,
    setCurrentMinutes, 
    breakBonus, 
    setBreakBonus, 
    overtimeRatio, 
    setOvertimeRatio} : SettingsTypes) => {
    
    useEffect(() => {
        setCurrentMinutes(defaultMinutes);
    }, [defaultMinutes]);

    return (
        <form className="pure-form pure-form-aligned">
            <div className="pure-control-group">          
                <label htmlFor="minutes">Work Time:</label>
                <div className="pure-u-1-6">
                    <input type="text" id="minutes" 
                        className="pure-input-1" 
                        value={defaultMinutes || ""} 
                        onChange={e => Number(e.target.value) >= 0 && 
                            setDefaultMinutes(Number(e.target.value))} />
                </div>
            </div>  
            <div className="pure-control-group">
                <label htmlFor="bonus">Break:</label>
                <div className="pure-u-1-6">
                    <input type="text" id="bonus" className="pure-input-1" value={breakBonus || ""} 
                        onChange={e => Number(e.target.value) >= 0 &&
                            setBreakBonus(Number(e.target.value))} />
                </div>
            </div>
            <div className="pure-control-group">
                <label htmlFor="ratio">Overtime:</label>
                <div className="pure-u-1-6">
                    <input type="text" id="ratio" className="pure-input-1" value={overtimeRatio || ""} 
                        onChange={e => Number(e.target.value) >= 0 &&
                            setOvertimeRatio(Number(e.target.value))} />
                </div>
            </div>
        </form>
    );
}

export default Settings;