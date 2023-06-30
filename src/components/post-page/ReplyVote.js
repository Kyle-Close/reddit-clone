import React from 'react';

import ReplyUpvoteButton from './ReplyUpvoteButton';
import ReplyDownvoteButton from './ReplyDownvoteButton';

function ReplyVote({ replyData, commentId }) {
	const [numUpvotes, setNumUpvotes] = React.useState(replyData.upvotes);
	const [numDownvotes, setNumDownvotes] = React.useState(replyData.downvotes);

	return (
		<div className='flex gap-2'>
			<ReplyUpvoteButton
				numUpvotes={numUpvotes}
				setNumUpvotes={setNumUpvotes}
				setNumDownvotes={setNumDownvotes}
				replyId={replyData.replyId}
				commentId={commentId}
			/>
			<ReplyDownvoteButton
				numDownvotes={numDownvotes}
				setNumUpvotes={setNumUpvotes}
				setNumDownvotes={setNumDownvotes}
				replyId={replyData.replyId}
				commentId={commentId}
			/>
		</div>
	);
}

export default ReplyVote;
