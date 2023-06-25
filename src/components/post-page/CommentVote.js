import React from 'react';

import CommentUpvoteButton from './CommentUpvoteButton';
import CommentDownvoteButton from './CommentDownvoteButton';

function CommentVote() {
	return (
		<div className='flex items-end gap-2'>
			<CommentUpvoteButton />
			<CommentDownvoteButton />
		</div>
	);
}

export default CommentVote;
