import React, {useEffect, useState, Dispatch, SetStateAction} from "react";

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
    
    //overtimeRatio is a number, Number("0.") becomes "0", so you need ratio
    //to update the float on screen while the user is typing
    const [ratio, setRatio] = useState(overtimeRatio.toString());
    const handleRatioChange = (s:string) => {
        const n = Number(s);
        console.log(overtimeRatio)
        if (n >= 0 && n <= 1) {
            setOvertimeRatio(n);
            setRatio(s);
        } else if (s === ".") {
            setRatio("0.");
        }
    };

    const posMaxInt = (v:number, max:number) => {
        return v >= 0 && v <= max && Number.isInteger(v);
    };

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
                        onChange={e => posMaxInt(Number(e.target.value), 999) &&
                            setDefaultMinutes(Number(e.target.value))} />
                </div>
            </div>  
            <div className="pure-control-group">
                <label htmlFor="bonus">Break:</label>
                <div className="pure-u-1-6">
                    <input type="text" id="bonus" 
                        className="pure-input-1" 
                        value={breakBonus || ""} 
                        onChange={e => posMaxInt(Number(e.target.value), 999) &&
                            setBreakBonus(Number(e.target.value))} />
                </div>
            </div>
            <div className="pure-control-group">
                <label htmlFor="ratio">Overtime:</label>
                <div className="pure-u-1-6">
                    <input type="text" id="ratio" 
                        className="pure-input-1" 
                        value={ratio} 
                        onChange={e => handleRatioChange(e.target.value)} />
                </div>
            </div>
        </form>
    );
}

export default Settings;