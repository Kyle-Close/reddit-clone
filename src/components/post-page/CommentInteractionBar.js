import React from 'react';
import RepliesButton from './RepliesButton';
import CommentVote from './CommentVote';
import ReplyButton from './ReplyButton';

function CommentInteractionBar() {
	return (
		<div className='flex gap-4'>
			<RepliesButton />
			<CommentVote />
			<ReplyButton />
		</div>
	);
}

export default CommentInteractionBar;
