import React from "react";

const Settings = ({defaultMinutes, setDefaultMinutes, 
    breakBonus, setBreakBonus, 
    overtimeRatio, setOvertimeRatio}) => {

    return (
        <form className="settings">
            <table>     
                <tbody>
                    <tr>             
                        <td><label htmlFor="minutes">Work Time:</label></td>
                        <td><input type="number" id="minutes" value={defaultMinutes} 
                            onChange={(e) => setDefaultMinutes(Number(e.target.value))}></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="bonus">Break:</label></td>
                        <td><input type="number" id="bonus" value={breakBonus} 
                            onChange={(e) => setBreakBonus(Number(e.target.value))}></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="ratio">Overtime:</label></td>
                        <td><input type="number" id="ratio" value={overtimeRatio} 
                            onChange={(e) => setOvertimeRatio(Number(e.target.value))}></input></td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

export default Settings;