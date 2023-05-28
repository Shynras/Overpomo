import React from "react";

type NavTypes = {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = ({active, setActive} : NavTypes) => {
    return (
        <div className="pure-g">
            <button className={`pure-u-1-2 pure-button ${!active ? "pure-button-active" : ""}`} 
                onClick={()=>{setActive(false)}}>History</button>
            <button className={`pure-u-1-2 pure-button ${active ? "pure-button-active" : ""}`}
                onClick={()=>{setActive(true)}}>Settings</button>
        </div>
    );
};

export default Nav