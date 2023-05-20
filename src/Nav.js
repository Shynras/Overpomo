import React from "react";

const Nav = ({setActive}) => {
    return (
        <div className="nav">
            <button onClick={()=>{setActive(true)}}>Settings</button>
            <button onClick={()=>{setActive(false)}}>History</button>
        </div>
    );
};

export default Nav