import React from "react";

import CommentExpandImage from '../../img/expand-icon.png'

function RepliesButton(){

    function handleClick(){
        console.log('Replies button clicked')
    }

    return (
        <button onClick={handleClick} className='mt-2 flex items-center gap-2'>
            <div>
                <img src={CommentExpandImage} />
            </div>
            
            <p>12 Replies</p>
        </button>
    )
}

export default RepliesButton