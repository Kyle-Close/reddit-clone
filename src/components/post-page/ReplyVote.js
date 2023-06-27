import React from "react";

import ReplyUpvoteButton from "./ReplyUpvoteButton";

function ReplyVote({replyData}){
    console.log(replyData)
    const [numUpvotes, setNumUpvotes] = React.useState(replyData.upvotes)

    return (
        <>
            <ReplyUpvoteButton
                numUpvotes={numUpvotes}
                setNumUpvotes={setNumUpvotes}
                replyId={replyData.replyId}
                replyUpvoteUsers={replyData.upvoteUsers}
            />
        </>
    )
}

export default ReplyVote