import React from "react";

const Nav = ({active, setActive}) => {
    return (
        <div className="nav">
            <button className={!active && "buttonOn"} 
                onClick={()=>{setActive(false)}}>History</button>
            <button className={active && "buttonOn"} 
                onClick={()=>{setActive(true)}}>Settings</button>
        </div>
    );
};

export default Nav