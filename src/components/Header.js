import React from "react";

function Header({children}){
    return (
        <div className="sticky top-0 h-16 bg-zinc-800">
            {children}
        </div>
    )
}

export default Header