import React, {useState} from "react";

const Settings = ({defaultMinutes, setDefaultMinutes}) => {
    const handleChange = (e) => {
        setDefaultMinutes(e.target.value);
    };
    return (
        <>
        <form>
            <input type="number" value={defaultMinutes} onChange={handleChange}></input>
        </form>
        <p>{defaultMinutes}</p>
        </>
    );
}

export default Settings;