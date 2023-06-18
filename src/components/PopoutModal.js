import React from "react";

function PopoutModal({modal}){
    const {direction} = modal;

    let result = "flex bg-green-800 absolute";
    if(direction === 'left' || direction === 'right'){
        result += ' w-2/3 inset-y-0'
        if(direction === 'left'){
            result += ' animate-slideInLeft left-0'
        }
        else if(direction === 'right'){
            result += ' animate-slideInRight right-0'
        }
    } else {
        // Direction bottom
        result += ` animate-slideUp h-40 inset-x-0 bottom-0`
    }
    

    return (<div className={result}>Modal</div>);
}

export default PopoutModal;
