import React from 'react';
import RepliesButton from './RepliesButton';
import CommentVote from './CommentVote';
import ReplyButton from './ReplyButton';

function CommentInteractionBar({ commentId, toggleExpanded, commentData }) {
	return (
		<div className='flex gap-4'>
			<RepliesButton
				commentData={commentData}
				toggleExpanded={toggleExpanded}
			/>
			<CommentVote />
			<ReplyButton commentId={commentId} />
		</div>
	);
}

export default CommentInteractionBar;
