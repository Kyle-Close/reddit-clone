import React from "react";

function PopoutModal({modal}){
    const {coverage, direction} = modal;
    const [className, setClassName] = React.useState(getClassNames(coverage, direction));

    function getClassNames(coverage, direction){

        const appendWidthClass = (coverage, result) => {
            switch(coverage) {
                case 0:
                  result += ' w-1/2';
                 return result
                case 1:
                result += ' w-1/3';
                  return result
              }
        }

        const appendHeightClass = (coverage, result) => {
            switch(coverage) {
                case 0:
                  result += ' h-1/3';
                 return result
                case 1:
                result += ' h-1/4';
                  return result
              }
        }

        let result = "flex bg-green-800 absolute";

        if(direction === 'left' || direction === 'right'){
            result += ' inset-y-0'
            result = appendWidthClass(coverage, result)
            if(direction === 'left'){
                result += ' left-0'
            }
            else if(direction === 'right'){
                result += ' right-0'
            }
        } else {
            // Direction bottom
            result += ` inset-x-0 bottom-0`
            result = appendHeightClass(coverage, result)
        }
        return result;
    }

    return (className && <div className={className}>Modal</div>);
}

export default PopoutModal;
