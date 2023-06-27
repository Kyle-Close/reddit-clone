import React from "react";

import ReplyUpvoteButton from "./ReplyUpvoteButton";

function ReplyVote({replyData, commentId}){
    const [numUpvotes, setNumUpvotes] = React.useState(replyData.upvotes)
    const [numDownvotes, setNumDownvotes] = React.useState(replyData.downvotes)

    return (
        <>
            <ReplyUpvoteButton
                numUpvotes={numUpvotes}
                setNumUpvotes={setNumUpvotes}
                setNumDownvotes={setNumDownvotes}
                replyId={replyData.replyId}
                replyUpvoteUsers={replyData.upvoteUsers}
                replyDownvoteUsers={replyData.downvoteUsers}
                commentId={commentId}
            />
        </>
    )
}

export default ReplyVote