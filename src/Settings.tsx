import React, {useEffect, useState, Dispatch, SetStateAction, MutableRefObject} from "react";

type SettingsTypes = {
    defaultMinutes : number,
    setDefaultMinutes : Dispatch<SetStateAction<number>>,
    setMinutes : Dispatch<SetStateAction<number>>,
    bonus : number,
    setBonus : Dispatch<SetStateAction<number>>,
    overtimeRatio : number,
    setOvertimeRatio : Dispatch<SetStateAction<number>>,
    interval : MutableRefObject<number>
}

const Settings = ({
    defaultMinutes, 
    setDefaultMinutes,
    setMinutes, 
    bonus, 
    setBonus, 
    overtimeRatio, 
    setOvertimeRatio,
    interval} : SettingsTypes) => {
    
    // overtimeRatio is a number, it doesn't save dots, Number("0.") becomes "0", 
    // so you need ratio to update the float on screen while the user is typing
    const [ratio, setRatio] = useState(overtimeRatio.toString());
    
    const handleRatioChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const s = e.target.value;
        const n = Number(s);

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

    const handleMinutesChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        let n = Number(e.target.value);
        if (posMaxInt(n, 999)) {
            setDefaultMinutes(n);
            setMinutes(n);
        }
    };

    const handleBonusChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        let n = Number(e.target.value)
        if (posMaxInt(n, 999)) {
            setBonus(n);
        }
    };

    return (
        <form className="pure-form pure-form-aligned">
            <div className="pure-control-group">          
                <label htmlFor="minutes">Work Time:</label>
                <div className="pure-u-1-6">
                    <input type="text" id="minutes" 
                        className="pure-input-1" 
                        value={defaultMinutes || ""} 
                        onChange={handleMinutesChange} />
                </div>
            </div>  
            <div className="pure-control-group">
                <label htmlFor="bonus">Break:</label>
                <div className="pure-u-1-6">
                    <input type="text" id="bonus" 
                        className="pure-input-1" 
                        value={bonus || ""} 
                        onChange={handleBonusChange} />
                </div>
            </div>
            <div className="pure-control-group">
                <label htmlFor="ratio">Overtime:</label>
                <div className="pure-u-1-6">
                    <input type="text" id="ratio" 
                        className="pure-input-1" 
                        value={ratio} 
                        onChange={handleRatioChange} />
                </div>
            </div>
        </form>
    );
}

export default Settings;