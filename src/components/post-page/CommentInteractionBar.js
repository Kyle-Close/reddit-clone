import React from 'react';
import RepliesButton from './RepliesButton';
import CommentVote from './CommentVote';
import ReplyButton from './ReplyButton';

function CommentInteractionBar({ commentId, toggleExpanded }) {
	return (
		<div className='flex gap-4'>
			<RepliesButton toggleExpanded={toggleExpanded} />
			<CommentVote />
			<ReplyButton commentId={commentId} />
		</div>
	);
}

export default CommentInteractionBar;
