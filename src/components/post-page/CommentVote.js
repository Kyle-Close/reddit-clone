import React from 'react';

import CommentUpvoteButton from './CommentUpvoteButton';
import CommentDownvoteButton from './CommentDownvoteButton';
import { commentService } from '../../firebase';

function CommentVote({ commentId }) {
	const [numUpvotes, setNumUpvotes] = React.useState(0);
	const [numDownvotes, setNumDownvotes] = React.useState(0);

	console.log(commentId);

	React.useEffect(() => {
		console.log(`upvotes: ${numUpvotes} downvotes: ${numDownvotes}`);
	}, [numUpvotes, numDownvotes]);

	React.useEffect(() => {
		const fetchComment = async () => {
			const commentData = await commentService.getCommentFromCommentId(
				commentId
			);
			setNumUpvotes(commentData.upvotes);
			setNumDownvotes(commentData.downvotes);
		};
		if (commentId) fetchComment();
	}, []);

	return numUpvotes && numDownvotes ? (
		<div className='flex items-end gap-2'>
			<CommentUpvoteButton numUpvotes={numUpvotes} />
			<CommentDownvoteButton numDownvotes={numDownvotes} />
		</div>
	) : (
		<div className='flex items-end gap-2'>
			<CommentUpvoteButton numUpvotes={0} />
			<CommentDownvoteButton numDownvotes={0} />
		</div>
	);
}

export default CommentVote;
