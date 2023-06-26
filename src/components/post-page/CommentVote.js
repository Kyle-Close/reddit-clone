import React from 'react';

import CommentUpvoteButton from './CommentUpvoteButton';
import CommentDownvoteButton from './CommentDownvoteButton';
import { commentService } from '../../firebase';

function CommentVote({ commentId }) {
	const [numUpvotes, setNumUpvotes] = React.useState(0);
	const [numDownvotes, setNumDownvotes] = React.useState(0);

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

	return (
		<div className='flex items-end gap-2'>
			<CommentUpvoteButton
				numUpvotes={numUpvotes}
				setNumUpvotes={setNumUpvotes}
			/>
			<CommentDownvoteButton
				numDownvotes={numDownvotes}
				setNumDownvotes={setNumDownvotes}
			/>
		</div>
	);
}

export default CommentVote;
